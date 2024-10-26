<script setup>

import {onMounted, ref} from "vue";
import router from "@/router";


const dbti = ref('');
const jobTag = ref('');

onMounted(() => {
  const dbtiItem = JSON.parse(localStorage.getItem('dbti'));
  const jobItem = JSON.parse(localStorage.getItem('jobTag')) ;
  dbti.value = dbtiItem.dbtiValue;
  jobTag.value = jobItem.jobTagName;
})

// 메인으로
function moveToMain(){
  localStorage.removeItem('dbti');
  localStorage.removeItem('jobTag');
  router.push('/');
}
</script>

<template>
  <div class="prefix-result_all">

    <div class="prefix-result_content">

      <div class="top_container">
        <div class="title">
          <span>< 당신의 수식어는 ></span>
        </div>
        <div class="prefix">
          <span class="first">{{ dbti }}</span> <span class="second"> {{ jobTag }}</span>
        </div>
      </div>
      <div class="bottom_container">
        <button @click="moveToMain">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .prefix-result_all{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .prefix-result_content{
    width: 650px;

  }
  .top_container, .bottom_container{
    width: 600px;
    max-width: 1000px;
    text-align: center;
  }
  .top_container{
    padding-top: 30px;
    height: 240px;
    background-color: #E6ECFD;
    box-shadow: 0 0 8px grey;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .top_container .title{
    font-size: 22px;
  }
  .top_container .title span{
    font-size: 22px;
    max-width: 900px;

  }
  .top_container .prefix{
    max-width: 900px;
    font-size: 25px;
    width: auto;
    height: 60px;
    margin-top: 50px;
    line-height: 60px;
    border: 2px #FFFFFF solid;
    padding-left: 30px;
    padding-right: 30px;
  }
  .bottom_container{
    margin-top: 35px;
  }
  .bottom_container button{
    color: white;
    background-color: #668EF7;
    border-color: #F1F5FF;
    box-shadow: 0 1px 1px;
    width: 100px;
    height: 35px;
    cursor: pointer;
  }
  .first{
    color: #29B417;
  }
  .second{
    color: #5689ff;
  }
  button:hover{
    scale: 110%;
  }
</style>