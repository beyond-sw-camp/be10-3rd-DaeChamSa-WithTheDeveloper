package com.developer.payment.command.application.service;

import com.developer.order.command.domain.aggregate.Order;
import com.developer.order.command.domain.repository.OrderRepository;
import com.developer.payment.command.application.dto.PaymentCallbackRequest;
import com.developer.payment.command.application.dto.RequestPayDTO;
import com.developer.payment.command.domain.aggregate.PaymentStatus;
import com.developer.payment.command.domain.repository.PaymentRepository;
import com.developer.user.command.entity.User;
import com.developer.user.command.repository.UserRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PaymentCommandServiceImpl implements PaymentCommandService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final IamportClient iamportClient;
    private final UserRepository userRepository;

    @Override
    public RequestPayDTO findRequestDTO(String orderUid) {

        log.info("로깅 확인 findRequestDTO");
        Order order = orderRepository.findByOrderUid(orderUid)
                .orElseThrow(() -> new IllegalArgumentException("주문이 없습니다."));

        User user = userRepository.findByUserCode(order.getUserCode()).orElseThrow(() -> new IllegalArgumentException("주문이 업습니다."));

        return RequestPayDTO.builder()
                .buyerName(user.getUserName())
                .buyerEmail(user.getUserEmail())
                .paymentPrice(order.getTotalPrice())
                .itemName("order")
                .orderUid(order.getOrderUid())
                .build();
    }

    @Override
    public IamportResponse<Payment> paymentByCallback(PaymentCallbackRequest request) {

        log.info("로깅 확인 paymentByCallback");

        try {
            // 결제 단건 조회(아임포트)
            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(request.getPaymentUid());
            // 주문내역 조회
            Order order = orderRepository.findByOrderUid(request.getOrderUid())
                    .orElseThrow(() -> new IllegalArgumentException("주문 내역이 없습니다."));

            // 결제 완료가 아니면
            if(!iamportResponse.getResponse().getStatus().equals("paid")) {
                // 주문, 결제 삭제
                orderRepository.delete(order);
                paymentRepository.deleteById(order.getPaymentCode());

                throw new RuntimeException("결제 미완료");
            }

            // DB에 저장된 결제 금액
            int price = order.getTotalPrice();
            // 실 결제 금액
            int iamportPrice = iamportResponse.getResponse().getAmount().intValue();

            // 결제 금액 검증
            if(iamportPrice != price) {
                // 주문, 결제 삭제
                orderRepository.delete(order);
                paymentRepository.deleteById(order.getPaymentCode());

                // 결제금액 위변조로 의심되는 결제금액을 취소(아임포트)
                iamportClient.cancelPaymentByImpUid(new CancelData(iamportResponse.getResponse().getImpUid(), true, new BigDecimal(iamportPrice)));

                throw new RuntimeException("결제금액 위변조 의심");
            }

            Optional<com.developer.payment.command.domain.aggregate.Payment> byId = paymentRepository.findById(order.getPaymentCode());

            // 결제 상태 변경
            log.info("결제 상태 변경 uid {}", iamportResponse.getResponse().getImpUid());
            byId.get().changePaymentBySuccess(PaymentStatus.OK, iamportResponse.getResponse().getImpUid());

            return iamportResponse;

        } catch (IamportResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
