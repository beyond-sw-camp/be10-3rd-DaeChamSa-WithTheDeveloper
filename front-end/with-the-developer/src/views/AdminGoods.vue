<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import AdminGoodsRegister from "@/views/Admin-GoodsRegister.vue";
import axios from "axios";
import Modal from "@/components/Modal.vue"; // 모달창
import { useRouter } from "vue-router"; // 페이징

const router = useRouter();

// 굿즈 등록 모달창
const showModal = ref(false);
const openModal = () => showModal.value = true;
const closeModal = () => showModal.value = false;

// admin 테스트 위한 토큰 하드코딩
const adminToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJDb2RlIjoxLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTcyOTgzMzYzNn0.Zk_Z_GvUoSl3U-HesPluY_YQGpHb0X57bfr-KIU8rcFGuJi9bF6zNTUbpNVs_NymFOc35hdAF_H6RoMkIfsABw";

// 서버에서 가져온 굿즈 데이터
const products = reactive([]);
const currentPage = ref(1); // 현재 페이지
const totalPage = ref(1); // 총 페이지 수

// 로그인 함수
const loginUser = async () => {
  try {
    localStorage.setItem('jwtToken', adminToken);

    // Axios 기본 헤더에 토큰 추가
    axios.defaults.headers.common['Authorization'] = adminToken;

    console.log("admin 로그인 성공");
    fetchGoods(); // 굿즈 목록 불러오기
  } catch (error) {
    console.error('로그인 실패:', error.response ? error.response.data : error.message);
  }
};

// 굿즈 등록
async function registGoods(goodsCreateDTO, images) {
  const formData = new FormData();
  // goodsCreateDTO 객체를 FormData로 반환
  formData.append('goodsCreateDTO', new Blob([JSON.stringify(goodsCreateDTO)], { type: "application/json" }));

  // 이미지 여러개일 경우
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append('images', image);
    });
  }

  try {
    const response = await axios.post('http://localhost:8080/goods', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('jwtToken')
      }
    });
    console.log("굿즈 등록 성공: ", response);
  } catch (error) {
    console.log("굿즈 등록 실패:", error);
    if (error.response.status === 403) {
      console.error("권한이 없습니다. 관리자가 아닙니다.");
    }
  }
}

// 굿즈 목록 조회, 갱신
const fetchGoods = async (page = 1) => {
  try {
    const response = await axios.get(`http://localhost:8080/public/goods?page=${page}`, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    });

    console.log("응답데이터: ", JSON.stringify(response.data, null, 2));

    const productList = response.data;

    for (const goods of productList) {
      const goodsInfo = await axios.get(`http://localhost:8080/public/goods/${goods.goodsCode}`);

      if (goodsInfo) {
        products.push({
          goodsCode: goodsInfo.data.goodsCode,
          goodsName: goodsInfo.data.goodsName,
          goodsContent: goodsInfo.data.goodsContent,
          goodsStatus: goodsInfo.data.goodsStatus,
          goodsPrice: goodsInfo.data.goodsPrice,
          images: goodsInfo.data.images || [], // 이미지가 없을 경우 빈 배열
        });
      }
    }

    console.log(products.length);

    // 총 페이지 수 계산
    totalPage.value = Math.ceil(response.headers['totalCount'] / 10);
  } catch (error) {
    console.log("굿즈 목록 불러오기 실패", error);
    products.splice(0, products.length);
  }
};

// 페이지 처리 함수
const setPage = (page) => {
  currentPage.value = page;
  fetchGoods(page);
};

// 페이지 로드 시 굿즈 목록 가져오기
onMounted(() => {
  loginUser(); // 로그인 후 굿즈 목록 가져오기
});

</script>

<template>
  <div class="admin-goods">
    <div class="header">
      <span>총 {{ products.length }}건</span>
      <button class="register-button" @click="openModal">등록하기</button>
    </div>

    <div class="admin-goods-content">
      <table>
        <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th><button class="delete-button">삭제</button></th>
          <th>이름</th>
          <th>가격</th>
          <th>상태</th>
          <th>수정</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="products.length === 0">
          <td colspan="6">데이터가 없습니다.</td>
        </tr>
        <tr v-for="product in products" :key="product.goodsCode">
          <td><input type="checkbox" /></td>
          <td><img :src="product.images[0] || 'default-image-path.png'" alt="product image" /></td>
          <td>
            <a @click.prevent="viewProductDetail(product.goodsCode)" class="name-click">{{ product.goodsName }}</a>
          </td>
          <td>{{ product.goodsPrice.toLocaleString() }}원</td>
          <td>{{ product.goodsStatus }}</td>
          <td>
            <button class="edit-button">수정</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 등록페이지 열기 위한 모달창 -->
  <Modal :show="showModal" @close="closeModal">
    <AdminGoodsRegister @cancel="closeModal" />
  </Modal>

  <!-- 페이지 -->
  <div class="pagination">
    <span v-for="page in totalPage" :key="page" @click="setPage(page)" :class="{ active: currentPage === page }">{{ page }}</span>
  </div>

</template>

<style scoped>
.admin-goods {
  border: 2px solid #c0c0c0;
  border-radius: 10px;
  padding: 30px;
  width: 50%;
  margin: auto;
  height: 820px;
  position: relative;
}

.admin-goods-content {
  font-size: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  margin-top: -25px;
  background: white;
  padding: 6px;
  border-radius: 10px 10px 0 0;
  font-size: 20px;
}

.register-button {
  background-color: #4a90e2;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.delete-button {
  background-color: #f56c6c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

img {
  width: 50px;
  height: 50px;
}

.name-click {
  background: none;
  border: none;
  cursor: pointer;
}

.edit-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 20px;
}

.pagination span {
  margin: 0 5px;
  cursor: pointer;
}

.pagination span.active {
  font-weight: bold;
  color: #1b5ac2;
}
</style>
