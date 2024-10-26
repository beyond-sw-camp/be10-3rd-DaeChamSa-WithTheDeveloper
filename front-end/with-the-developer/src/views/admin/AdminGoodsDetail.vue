<template>
  <div class="goods-detail">
    <h1>{{ product.goodsName }}</h1>
    <img :src="product.images && product.images[0] ? product.images[0] : 'default-image-path.png'" alt="product image" />
    <p>{{ product.goodsContent }}</p>
    <p>가격: {{ product.goodsPrice.toLocaleString() }}원</p>
    <p>상태: {{ product.goodsStatus }}</p>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import axios from 'axios';

const props = defineProps({
  goodsCode: Number
});

const product = ref({});

const fetchProductDetail = async () => {
  if(props.goodsCode){
    try {
      const response = await axios.get(`http://localhost:8080/goods/${props.goodsCode}`,{
        headers: {
          Authorization: `Bear ${localStorage.getItem('jwtToken')}`
        }});
      product.value = response.data;
    } catch (error) {
      console.log("상품 정보 불러오기 실패", error);
    }
  }
};

// goodsCode 변경될때마다 가져오기
watch(()=>props.goodsCode, fetchProductDetail());
onMounted(fetchProductDetail);
</script>

<style scoped>
/* 스타일 추가 */
</style>
