<script setup>
import router from "@/router/index.js";

const moveToRes = () => {
  router.push('/mypage/resMsg');
}
const moveToSend = () => {
  router.push('/mypage/sendMsg');
}
const moveToRead = () => {
  router.push('/mypage/readMsg');
}
const moveToBlock = () => {
  router.push('/mypage/block');
}
</script>

<template>
  <div id="header">
    <h2>쪽지</h2>
    <ul>
      <li><button class="header_button" id="res" @click="moveToRes">수신쪽지</button></li>
      <li><button class="header_button" id="isRead" @click="moveToRead">읽은쪽지</button></li>
      <li><button class="header_button" id="send" @click="moveToSend">발신쪽지</button></li>
      <li><button class="header_button" id="block" @click="moveToBlock">차단관리</button></li>
    </ul>
  </div>
</template>

<style scoped>
#header {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}
ul {
  list-style: none;
  display: flex;
}
li {
  margin-right: 20px;
}
.header_button{
  font-family: "Neo둥근모 Pro";
  width: 90px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 15px;
}
.header_button:hover{
  border-color: #617CC2;
  color: #617CC2;
}
</style>