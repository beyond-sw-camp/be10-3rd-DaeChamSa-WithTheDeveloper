<script setup>
import {onMounted} from "vue";
import {useStore} from "vuex";
import router from "@/router/index.js";
import axios from "axios";

// JWT 파싱 함수
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]; // 페이로드 부분
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url을 Base64로 변환
    return JSON.parse(atob(base64)); // Base64 디코딩 후 JSON 파싱
  } catch (error) {
    console.error('JWT 파싱 오류:', error);
    return null;
  }
}

// 성향테스트 창
function moveToDbtiTest(){
  router.push('/prefix/test');
}

// 메인화면
const moveToMain = () => {
  router.push('/main')
}

onMounted(() => {
  // 페이지가 로드될 때 토큰을 처리
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');
  const refreshToken = urlParams.get('refreshToken');

  const store = useStore();

  if (accessToken && refreshToken) {
    store.dispatch('login', `Bearer ${accessToken}`); // Vuex 스토어에 로그인 처리
    store.dispatch('startLogoutTimer');  // 30분 타이머 (토큰 유효시간)
    // 북마크 목록 vuex에 초기화
    store.dispatch('fetchItems');
    // 로컬스토리지에 토큰값 저장
    localStorage.setItem('refreshToken', refreshToken);

    // 로컬스토리지에 유저 권한 저장
    const userRole = parseJwt(accessToken).auth; // accessToken에서 auth 추출
    const userCode = parseJwt(accessToken).userCode;
    const userId = parseJwt(accessToken).sub;
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userCode', userCode);
    localStorage.setItem('userId', userId);
    alert('카카오 로그인 성공');

    axios.get('/prefix')
        .then(res => {
          if (res.data){
            moveToMain();
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 404){
            console.log('여기서의 404는 오류가 아닙니다');
            moveToDbtiTest();
          } else {
            console.error('수식어 조회중 오류 발생', error);
          }
        });

  } else {
    console.error('로그인 오류: 토큰을 찾을 수 없습니다.');
  }
})
</script>

<template>

</template>

<style scoped>

</style>