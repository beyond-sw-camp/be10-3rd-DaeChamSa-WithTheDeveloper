<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";

const orderGoodsList = reactive([]);
let orderDate = ref([]);

const orderUid = ref('');
// URL에서 orderCode 추출
const getOrderCodeFromURL = () => {
  const path = window.location.pathname; // 현재 경로 추출
  const segments = path.split('/'); // '/'로 분할하여 배열로 만듦
  console.log(segments[segments.length - 1]);
  return segments[segments.length - 1]; // 마지막 요소가 orderCode
};

const fetchOrderDetail = async () => {
  try {
    let orderCode = getOrderCodeFromURL(); // URL에서 주문 번호 가져오기
    const response = await axios.get('http://localhost:8080/order', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      }
    });
    console.log(response)
    const orderList = response.data;
    const specificOrder = orderList.find(order => order.orderCode == orderCode);
    // orderDate = specificOrder.orderDate;


    console.log(specificOrder.responsePaymentDTO.paymentCode);
    if (specificOrder) {
      orderDate = specificOrder.orderDate;
      console.log(specificOrder.responsePaymentDTO.paymentCode);

      // paymentCode를 사용하여 GET 요청 보내기
      const paymentCode = specificOrder.responsePaymentDTO.paymentCode;
      const paymentResponse = await axios.get(`http://localhost:8080/payment/code/${paymentCode}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
      });
      console.log("Payment Details:", paymentResponse.data); // 결제 정보 출력
      specificOrder.orderGoods.forEach(goods => {
            orderGoodsList.push({
              orderGoodsCode: goods.orderGoodsCode,
              goodsCode: goods.goodsCode,
              orderGoodsPrice: goods.orderGoodsPrice,
              orderGoodsAmount: goods.orderGoodsAmount,
              goodsName: goods.goodsName,
              paymentCode: goods.paymentCode
            })
      });

      await getOrderUid(orderCode);
    }
  } catch (error) {
    console.log("주문 목록을 불러오던 도중 오류 발생:", error);
  }
}

const getOrderUid = async (orderCode) => {
  try {
    const response = await axios.get(`http://localhost:8080/order/${orderCode}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    console.log(response)
    if (response.data) {
      orderUid.value = response.data; // 주문 UID 설정
    }
    console.log('Order UID Response:', response.data);
  } catch (error) {
    console.log('Order UID 요청 도중 오류 발생:', error);
  }
};


onMounted((async() => {
  await fetchOrderDetail();
  //await getOrderUid(orderCode);
}))
</script>

<template>
  <div>
    <div>주문 상세 내역</div>
    <div>
      <div>
        <div>{{ orderDate }}</div>
        <div>
          <div>주문번호</div>
          <div>{{ orderUid }}</div>
        </div>
      </div>
      <hr>
      <div>
        <div>주문내역</div>
        <div v-for="goods in orderGoodsList">
          <img>
          <div>
            <div>{{ goods.goodsName}}</div>
            <div>{{ goods.orderGoodsPrice}}</div>
          </div>
        </div>
      </div>
      <div>
        <div>결제상세</div>
        <div>
          <div>결제방식</div>
          <div>카카오페이</div>
        </div>
        <div>
          <div>결제금액</div>
          <div>22400원</div>
        </div>
      </div>

    </div>
    <button>주문 취소</button>
  </div>
</template>

<style scoped>

</style>
