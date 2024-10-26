<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import router from "@/router/index.js";

// 통신을 통해 결과 배열을 가져옴
const fetchedResults = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8; // 한 페이지에 표시할 아이템 수
const selectedItem = ref([]); // 선택한 항목

// 데이터 가져오기
onMounted(() => {
  axios.get(`/job-tag`)
      .then(res => {
        fetchedResults.value = res.data; // 통신을 통해 데이터 배열을 받음
      })
      .catch(error => {
        console.error('결과 데이터를 가져오는 중 오류 발생:', error);
      });
})

// 현재 페이지의 데이터를 계산
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return fetchedResults.value.slice(start, end);
});

// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(fetchedResults.value.length / itemsPerPage);
});

// 이전 페이지로 이동
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 다음 페이지로 이동
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 항목 선택 시 호출
const selectItem = (item) => {
  selectedItem.value = item;
};

// 항목 선택 완료
const complete = () => {
  alert(`${selectedItem.value.jobTagName} 선택 완료`);
  localStorage.setItem('jobTag', JSON.stringify(selectedItem.value));
  const savedDbti = JSON.parse(localStorage.getItem('dbti'));

  const accessToken = localStorage.getItem('accessToken');
  const prefixCreateDTO = {
    dbtiCode: savedDbti.dbtiCode,
    jobTagCode: selectedItem.value.jobTagCode
  }
  axios.post('/prefix', prefixCreateDTO)
      .then(res => {
        if (res.status === 200){
          router.push('/prefix/result');
        } else {
          alert('수식어 생성 실패');
          console.log('수식어 생성 실패');
        }
      })
      .catch(error => {
        console.error('수식어 생성중 오류 발생', error);
      });
}
</script>

<template>
  <div class="result-container">
    <h2>현재 직무 선택</h2>
    <p>현재 또는 희망하는 직무를 선택해주세요.</p>

    <div class="buttons-container">
      <div v-for="(item, index) in paginatedResults" :key="index">
        <button
            :class="{ selected: selectedItem === item }"
            @click="selectItem(item)">
          {{ item.jobTagName }}
        </button>
      </div>
    </div>

    <!-- 페이지네이션 버튼 -->
    <div class="pagination">
      <button @click="goToPrevPage" :disabled="currentPage === 1">이전</button>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">다음</button>
    </div>

    <!-- 선택시 완료 버튼 표시 -->
    <div v-if="selectedItem">
      <button class="complete-button" @click="complete">선택</button>
    </div>
  </div>
</template>

<style scoped>
.result-container {
  text-align: center;
}

.buttons-container {
  display: grid;
  justify-content: center;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(20%, auto));

}

button {
  width: 150px;
  padding: 10px 20px;
  border: 1px solid #000;
  background-color: white;
  cursor: pointer;
}
.pagination button{
  width: 100px;
  margin: 15px;
}

button.selected {
  background-color: #007BFF;
  color: white;
}

.pagination {
  margin-top: 20px;
}

.complete-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
