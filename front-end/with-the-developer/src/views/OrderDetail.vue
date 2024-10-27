<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";

const orderGoodsList = reactive([]);
let orderDate = ref([]);
let totalPrice = ref([]);
const paymentUid = ref('');

const orderUid = ref('');
// URL에서 orderCode 추출
const getOrderCodeFromURL = () => {
  const path = window.location.pathname; // 현재 경로 추출
  const segments = path.split('/'); // '/'로 분할하여 배열로 만듦
  return segments[segments.length - 1]; // 마지막 요소가 orderCode
};

const fetchOrderDetail = async () => {
  try {
    let orderCode = getOrderCodeFromURL(); // URL에서 주문 번호 가져오기
    const response = await axios.get('http://localhost:8080/order');
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
      const paymentResponse = await axios.get(`http://localhost:8080/payment/code/${paymentCode}`);
      totalPrice = paymentResponse.data.paymentPrice;
      paymentUid.value = paymentResponse.data.paymentUid;

      //console.log("Payment Details:", paymentResponse.data.paymentPrice); // 결제 정보 출력
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
    const response = await axios.get(`http://localhost:8080/order/${orderCode}`);

    if (response.data) {
      orderUid.value = response.data; // 주문 UID 설정
    }
  } catch (error) {
    console.log('Order UID 요청 도중 오류 발생:', error);
  }
};

// 가격 10000 -> 10,000으로 formatting
const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return '가격 정보가 없습니다';
  }
  return price.toLocaleString();
}

// 이미지 URL 생성 함수
const getImageUrl = (fileName) => `${BASE_IMAGE_URL}/${fileName}`;

onMounted((async () => {
  await fetchOrderDetail();
  //await getOrderUid(orderCode);
}))

function orderCancel() {
  axios.put(`/payment/${paymentUid.value}`)
      .then(res => {
        if (res.status === 200) {
          alert('결제 취소 성공');
        } else {
          alert('결제 취소 실패');
        }
      })
      .catch(error => {
        if (error.status === 409) {
          alert('결제 취소가 완료 된 주문입니다.');
        } else {
          console.error('결제 취소중 오류 발생', error);
        }
      })
}
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
          <div>{{ totalPrice }}원</div>
        </div>
      </div>

    </div>
    <button @click="orderCancel">주문 취소</button>
  </div>
</template>

<style scoped>

</style>
