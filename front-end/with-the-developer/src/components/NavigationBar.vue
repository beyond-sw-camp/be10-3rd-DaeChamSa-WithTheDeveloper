<script setup>

import {computed, ref} from 'vue';
import router from "@/router";
import {useStore} from "vuex";
import NotiModal from "@/components/NotiModal.vue";

const searchState = ref(false);

  function switchSearch() {
    searchState.value = !searchState.value;
  }
// userRole의 변경을 실시간 감지
const isNotAdmin = computed(() => store.getters.userRole !== 'ROLE_ADMIN');
  // 상태관리
const store = useStore();

  // 로그인 유무
const isLoggedIn = computed(() => store.getters.isLoggedIn);

// 로그인
const moveToLogin = () => {
  if (!isLoggedIn.value) {
    // window.location.href =`/login`;
    router.push('/login');
  } else {
    store.dispatch('logout'); // 로그아웃 처리
    router.push('/');
  }
};

const moveTo = (type) => {

  if (type === '/mypage/info' && !isLoggedIn.value) {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/login');
    return;
  }
  if (type === '/' && isLoggedIn.value){
    router.push('/main');
    return;
  }

  router.push(`${type}`)
}

// 모달 상태 관리
const showModal = ref(false);
function toggleModal() {
  showModal.value = !showModal.value;
}

</script>

<template>
  <header>
    <div id="nav-left">
      <img src="../assets/images/logo.png" alt="로고 이미지" id="logo-image" @click="moveTo('/')">
      <ul class="nav-ul">
        <li class="nav-menu" @click="moveTo('/main')">게시판</li>
        <li class="nav-menu" @click="moveTo('/recruit')">채용공고</li>
        <li class="nav-menu" @click="moveTo('/goods')">굿즈</li>
        <li class="nav-menu" @click="moveTo('/mypage/info')" v-if="isNotAdmin">마이페이지</li>
      </ul>
    </div>
    <div id="nav-right">
      <ul class="nav-ul">
        <li class="nav-menu">
          <span @click="moveToLogin">{{ isLoggedIn ? '로그아웃' : '로그인' }}</span>
        </li>
        <li class="nav-menu"><a id="login" @click="toggleModal">
          <img src="https://img.icons8.com/?size=100&id=eMfeVHKyTnkc&format=png&color=000000" alt="alarm" class="nav-img"></a></li>
        <li class="nav-menu" @click="moveTo('/cart-goods')"><a id="login"><img src="https://img.icons8.com/?size=100&id=zhda2EVBCvHY&format=png&color=000000" alt="cart" class="nav-img"></a></li>
        <li class="nav-menu">
          <a id="login">
            <img src="https://img.icons8.com/?size=100&id=elSdeHsB03U3&format=png&color=000000" alt="search" class="nav-img" @click="switchSearch">
          </a>
        </li>
      </ul>
    </div>
  </header>
  <form id="search-input"  v-if="searchState">
    <input type="text" placeholder="검색어 입력">
    <button type="submit">검색</button>
  </form>

  <!-- 알림 모달 추가 -->
  <NotiModal :showModal="showModal" @close="toggleModal" />

</template>

<style scoped>
header{
  font-family: "Neo둥근모 Pro";
  font-size: 20px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
}
#nav-left{
  display: flex;
  float: left;
  width: 700px;
}
#logo-image{
  width: 170px;
  height: 50px;
  margin-top: 5px;
  margin-left: 30px;
  cursor: pointer;
}
.nav-ul{
  list-style: none;
  display: flex;
  margin-top: 20px;
  white-space: nowrap;
}
.nav-menu{
  margin-right: 40px;
  height: auto;
}
.nav-menu span{
  cursor: pointer;
}
.nav-menu span:hover{
  color: #1b5ac2;
}
.nav-menu{
  text-decoration-line: none;
  color: #7E7E7E;
}

.nav-menu:hover{
  color: #1b5ac2;
  cursor: pointer;
}
#nav-right{
  display: flex;
  float: right;
  width: 380px;
}
#login{
  text-decoration-line: none;
  color: black;
}
.nav-img{
  width: 40px;
  height: 40px;
  position: relative;
  top: -10px;
}
#search-input{
  height: 40px;
  width: 320px;
  border: 1px solid #1b5ac2;
  padding: 0;
  position: absolute;
  right: 40%;
  top: 8%;
}
input{
  font-size: 16px;
  width: 250px;
  padding: 10px;
  border: 0;
  outline: none;
  float: left;
}
button {
  width: 50px;
  height: 100%;
  border: 0;
  background-color: #1b5ac2;
  float: left;
  color: white;
}


</style>