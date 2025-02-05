package com.developer.order.query.service;

import com.developer.common.exception.CustomException;
import com.developer.common.exception.ErrorCode;
import com.developer.goods.query.mapper.GoodsMapper;
import com.developer.order.query.dto.OrderGoodsListDTO;
import com.developer.order.query.dto.OrderListDTO;
import com.developer.order.query.dto.ResponseOrderListDTO;
import com.developer.order.query.mapper.OrderMapper;
import com.developer.payment.query.dto.ResponsePaymentDTO;
import com.developer.payment.query.mapper.PaymentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderQueryService {

    private final OrderMapper orderMapper;
    private final PaymentMapper paymentMapper;
    private final GoodsMapper goodsMapper;

    // 주문 내역 조회
    public List<ResponseOrderListDTO> orderList(Long userCode){

        // 사용자 코드로 주문 내역 찾기
        List<OrderListDTO> orderByUserCode = orderMapper.findOrderByUserCode(userCode);

        // 주문 내역이 없으면
        if (orderByUserCode.isEmpty()){
            throw new CustomException(ErrorCode.NOT_FOUND_ORDER_LIST);
        }

        List<ResponseOrderListDTO> responseOrderListDTOS = new ArrayList<>();

        for (OrderListDTO orderList : orderByUserCode) {
            
            // 주문 코드로 주문굿즈들 찾기
            List<OrderGoodsListDTO> orderGoodsByOrderCode =
                    orderMapper.findOrderGoodsByOrderCode(orderList.getOrderCode());

            for (OrderGoodsListDTO orderGoodsDTO : orderGoodsByOrderCode) {
                String goodsName = goodsMapper.selectGoodsByCode(orderGoodsDTO.getGoodsCode()).getGoodsName();
                orderGoodsDTO.setGoodsName(goodsName);
            }
            // 결제 관련도 가져오기
            ResponsePaymentDTO paymentByOrderCode =
                    paymentMapper.findByPaymentCode(orderList.getPaymentCode());

            // responseOrderListDTO 생성
            ResponseOrderListDTO responseOrderListDTO = new ResponseOrderListDTO(
                    orderList.getOrderCode(),
                    orderList.getOrderCreateDate(),
                    orderList.getOrderStatus(),
                    paymentByOrderCode,
                    orderGoodsByOrderCode
            );
            
            // 반환할 리스트에 넣기
            responseOrderListDTOS.add(responseOrderListDTO);
        }

        return responseOrderListDTOS;
    }

    public String getOrderUid(Long orderCode){
        return orderMapper.findOrderUidByOrderCode(orderCode);
    }

}
