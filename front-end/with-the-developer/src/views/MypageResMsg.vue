<script setup>
import { reactive } from 'vue';

import MypageSideBar from "@/components/MypageSideBar.vue";


</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <div id="header">
        <h2>쪽지</h2>
        <ul>
          <li><button class="header_button" id="res">수신쪽지</button></li>
          <li><button class="header_button" id="isRead">읽은쪽지</button></li>
          <li><button class="header_button" id="send">발신쪽지</button></li>
          <li><button class="header_button" id="block">차단관리</button></li>
        </ul>
      </div>
      <article id = "info">
        <div id="tool_bar">
          <input type="checkbox" id="selectAll">
          <p id="read">읽음</p>
          <p id="delete">삭제</p>
        </div>
        <hr>

      </article>
    </div>
  </section>

</template>

<style scoped>
section{
  display: flex;
  height: 700px;
}
#content{
  margin: 35px 0 0 100px;
}
#info{
  width: 500px;
  height: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
}

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
#res{
  border-color: #617CC2;
  color: #617CC2;
}
#tool_bar{
  display: flex;
  padding-left: 10px;
  margin-bottom: 0;
}
hr{
  margin: 0;
}
#read{
  color: #7A7A7A;
  margin-right: 10px;
  margin-left: 20px;
}
#read, #delete:hover{
  cursor: pointer;
}
#delete{
  color: #FF3838;
  margin-right: 10px;
  margin-left: 10px;
}
[type="checkbox"]{
  width: 17px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>