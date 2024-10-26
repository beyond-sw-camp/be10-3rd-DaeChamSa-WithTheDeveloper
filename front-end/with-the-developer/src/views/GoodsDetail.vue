<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import {useRoute} from "vue-router";
import BlueModal from "@/components/blueModal.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {BASE_IMAGE_URL} from "@/config/image-base-url.js";

const route = useRoute();
const goodsCode = route.params.goodsCode;

// 굿즈 상세 페이지에 관한 선언
const goodsTitle = ref('');
const goodsContent = ref('');
//const goodsStatus = ref('');
const goodsPrice = ref('0');
const goodsImages = ref([]);
const goodsAmount = ref('1');

// 장바구니에 담을 굿즈들에 관한 선언
const goodsDetail = ref(null);
//const cartGoods = ref([]);

// 모달
const isBlueModalOpen = ref(false);
const openBlueModal = () => {
  isBlueModalOpen.value = true;
}
const handleConfirm = () => {
  addToCart(goodsCode, goodsAmount.value);
}

// 이미지 URL 생성 함수
const getImageUrl = (fileName) => `${BASE_IMAGE_URL}/${fileName}`;

const fetchGoodsDetail = async() => {
  try {
    const response = await axios.get(`http://localhost:8080/public/goods/${goodsCode}`);

    goodsDetail.value = response.data;

    goodsTitle.value = goodsDetail.value.goodsName;
    goodsContent.value = goodsDetail.value.goodsContent;
    //goodsStatus.value = goodsDetail.goodsStatus;
    goodsPrice.value = goodsDetail.value.goodsPrice;
    goodsImages.value = goodsDetail.value.images;
    goodsAmount.value = 1;

  } catch (error) {
    console.log("굿즈 상세 정보를 불러오던 중 에러 발생", error);
  }
}
// 가격 10000 -> 10,000으로 formatting
const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return '가격 정보가 없습니다';
  }
  return price.toLocaleString();
}

// 굿즈 수량 조절
const updateQuantity = async(amount) => {
  const updatedAmount = goodsAmount.value + amount;
  goodsAmount.value = updatedAmount;
  if (updatedAmount < 1) {
    alert('1개 이상부터 구매할 수 있습니다.');
    return;
  }
}

const addToCart = async (goodsCode, amount) => {
  // FormData 객체를 생성하여 데이터 추가
  const formData = new FormData();
  formData.append('cartGoodsAddDTO', JSON.stringify({
    goodsCode: goodsCode,
    goodsAmount: amount
  }));

  try {
    await axios.post("http://localhost:8080/cart-goods", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // multipart 형식 지정
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      }
    });
    console.log("장바구니에 상품이 성공적으로 추가되었습니다.");
  } catch (error) {
    console.error("장바구니에 추가하던 중 에러 발생", error);
  }
}

onMounted(() => {
  fetchGoodsDetail();
})
</script>

<template>
  <BlueModal
      :blueModalValue="isBlueModalOpen"
      @update:blueModalValue="isBlueModalOpen = $event"
      @confirm="handleConfirm"
      title="장바구니"
      content="해당 상품을 장바구니에 담으시겠습니까?"/>
  <div>
    <div id="goods_summary_box" class="flex">
      <div v-if="goodsImages && goodsImages.length" class="image-slider">
        <swiper
            :slides-per-view="1"
            :navigation="true"
            :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(image, index) in goodsImages" :key="index">
            <img :src="getImageUrl(image.fileName)" alt="게시글 이미지"/>
          </swiper-slide>
        </swiper>
      </div>
      <div id="goods_summary_text_box">
        <div id="goods_title_text">{{ goodsTitle }}</div>
        <br>
        <div id="price_text">
          <span>{{ formatPrice(goodsPrice) }}</span>
          <span>원</span>
        </div>
        <div id="quantity_text_box" class="flex">
          <div>수량</div>
          <div id="quantity_box">
            <span class="pointer" @click="updateQuantity(-1)">-</span>
            <span>{{ goodsAmount }}</span>
            <span class="pointer" @click="updateQuantity(1)">+</span>
          </div>
        </div>
        <div id="price_text_box" class="flex">
          <div>총 상품금액 </div>
          <div>{{ formatPrice(goodsPrice * goodsAmount) }}원</div>
        </div>
        <button @click="openBlueModal">장바구니에 담기</button>
      </div>
    </div>
    <hr>
    <div id="goods_detail_box">
      <div>{{ goodsTitle }}</div>
      <div>{{ goodsContent }}</div>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: "Neo둥근모 Pro";
  margin: 0 auto;
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.image-slider {
  width: 360px;
}

.image-slider img {
  height: 300px;
  width: auto;
  object-fit: cover;
}

#goods_summary_box img {
  width: 360px;
  height: 360px;
  border-radius: 0 ;
}

#goods_summary_box {
  width: 800px;
  margin: 30px auto;
  justify-content: space-between;
}

#goods_summary_text_box {
  width: 380px;
  padding-top: 48px;
}

#goods_title_text {
  font-size: 22px;
}

#price_text span:first-child {
  font-size: 22px;
}

#quantity_text_box {
  align-items: center;
  width: 200px;
  margin-top: 36px;
  margin-bottom: 74px;
  margin-left: 0;
}


#quantity_box {
  border: #6C94D0 1px solid;
  border-radius: 30px;
  width: 90px;
  height: 35px;
  font-size: 20px;
  margin-left: 20px;
  justify-content: flex-start;
}

#quantity_box > span {
  display: inline-block;
  width: 29px;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
}

#price_text_box {
  float: right;
  align-items: baseline;
}

#price_text_box > div:last-child {
  font-size: 22px;
  margin-left: 14px;
}

button {
  width: 380px;
  height: 58px;
  background-color: #94B1F5;
  border: none;
  border-radius: 24px;
  color: white;
  font-size: 16px;
  margin-top: 24px;
  cursor: pointer;
}

hr {
  border: #C0C0C0 1px solid;
  width: 820px;
}

#goods_detail_box {
  width: 818px;
  margin: 0 auto;
}
#goods_detail_box > div:first-child {
  font-size: 22px;
  text-align: center;
  margin-top: 50px;
}

#goods_detail_box > div:last-child {
  font-size: 17px;
  text-align: center;
  margin-top: 50px;
}
</style>

