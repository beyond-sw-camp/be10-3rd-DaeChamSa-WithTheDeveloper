<script setup>
import axios from "axios";
import {onMounted, reactive} from "vue";

const orderGoodsList = reactive([]);
const orderGoodsDetail = reactive([]);

const fetchOrderList = async () => {
  try {
    const response = await axios.get('http://localhost:8080/order', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      }
    });
    const orderList = response.data;

    orderList.forEach(goods => {
      orderGoodsList.push({
        orderCode: goods.orderCode,
        orderGoods: goods.orderGoods
      })
    })

    orderList.forEach(goods => {
      orderGoodsDetail.push({
        orderCode: goods.orderCode,
        orderDate: goods.orderDate,
        orderStatus: goods.orderStatus,
        orderPrice: goods.responsePaymentDTO.paymentPrice,
        goodsName: goods.orderGoods[0].goodsName,
        goodsCount: goods.orderGoods.length - 1
      })
    })
    console.log(orderList);
    console.log(orderGoodsList[0].orderGoods[0].orderGoodsCode);
    console.log(orderGoodsDetail);
  } catch (error) {
    console.log("주문 목록을 불러오던 도중 오류 발생:", error);
  }
}

// 가격 10000 -> 10,000으로 formatting
const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return '가격 정보가 없습니다';
  }
  return price.toLocaleString();
}

// 주문 상태에 따른 한글값 변환
const getOrderStatus = (status) => {
  switch(status) {
    case 'READY':
      return '결제실패';
    case 'OK':
      return '결제완료';
    case 'CANCEL':
      return '결제취소';
  }
}

onMounted((async () => {
  await fetchOrderList();
}))
</script>

<template>
  <div>
    <div>주문내역</div>
    <div>
      <div>
        <div>주문완료</div>
        <div v-for="order in orderGoodsDetail" :key="order.orderCode">
          <router-link :to="`/order-detail/${order.orderCode}`">
            <img>
            <div>
              <div>{{ order.orderDate }} 결제</div>
              <div>{{ order.goodsName }} 외 {{ order.goodsCount }}건</div>
              <div>{{ order.orderPrice }}원</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>