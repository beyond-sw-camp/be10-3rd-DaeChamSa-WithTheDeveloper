<script setup>
import SearchBar from "@/components/SearchBar.vue";
import {ref, onMounted, computed, watch, reactive} from "vue";
import axios from "axios";
import {usePagination} from "@/components/Pagination.js";
import {BASE_IMAGE_URL} from "@/config/image-base-url.js";

const products = ref([]);
const itemsPerPage = 12; // 한페이지에 12개
const {currentPage, totalPage, paginatedItems, setPage, setTotalPage} = usePagination(products, itemsPerPage);

// 이미지 URL 생성 함수
const getImageUrl = (fileName) => `${BASE_IMAGE_URL}/${fileName}`;

// 굿즈 목록을 가져오기
const fetchGoodsList = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/public/goods?page=${page}`);
    const goodsList = response.data;

    goodsList.forEach(goods => {
      products.value.push({
        goodsCode: goods.goodsCode,
        goodsTitle: goods.goodsName,
        goodsPrice: goods.goodsPrice,
        images: goods.images || []
      });
    });
  } catch (error) {
    console.error("굿즈 목록을 불러오는 중 에러가 발생했습니다.", error);
  }
};
// 컴포넌트가 마운트될 때 첫 번째 페이지의 굿즈 목록을 가져옵니다.
onMounted(() => {
  fetchGoodsList();
});
</script>

<template>
  <div id="goods_list_page_box">
    <div>총 {{ products.length }}건</div>
    <div id="goods_list_box">
      <div v-for="goods in paginatedItems" :key="goods.goodsCode" class="goods">
        <router-link :to="`/goods/${goods.goodsCode}`">
          <img :src="getImageUrl(goods.images[0]?.fileName)">
          <div>
            <div class="goods_title">{{ goods.goodsTitle }}</div>
            <div class="goods_price">{{ goods.goodsPrice }}원</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <!--  페이징 -->
  <div class="pagination">
    <span v-for="page in totalPage" :key="page" @click="setPage(page)" :class="{ active: currentPage === page }">{{
        page
      }}</span>
  </div>
</template>

<style scoped>
* {
  margin: 0 auto;
}

#goods_list_page_box {
  width: 1040px;
}

#goods_list_box {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 260px 260px 260px 260px;
  grid-template-rows: 400px 400px 400px;
}

.goods {
  cursor: pointer;
}

img {
  width: 240px;
  height: 280px;
  margin-bottom: 10px;
}

.goods_title {
  font-size: 18px;
  margin-bottom: 16px;
}

.goods_price {
  font-size: 17px;
}

.pagination { /* 페이지 넘버링 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 20px;
}

.pagination span { /* 페이지 숫자 간격, 마우스 커서 변경 */
  margin: 0 5px;
  cursor: pointer;
}

.pagination span.active {
  font-weight: bold;
  color: #1b5ac2;
}

a {
  text-decoration: none;
  color: inherit;
}

</style>