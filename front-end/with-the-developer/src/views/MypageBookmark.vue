<script setup>
import { reactive } from 'vue';

import MypageSideBar from "@/components/MypageSideBar.vue";


</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <h2>북마크</h2>
      <article id="bookmark">
        <div class="bookmarkList">
          <div>
            <p class="bookmark_title">테스트 타이틀</p>
            <p class="bookmark_content">테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다. 테스트 내용입니다.</p>
          </div>
          <div>
            <p class="bookmark_date">2024.02.11</p>
            <p class="bookmark_prefix">성실한 백엔드 테스트</p>
          </div>
          <div class ="bookmark_count">
            <img class="bookmark_img" src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000" alt="북마크 이미지">
            <p>100</p>
          </div>
        </div>
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
#bookmark{
  width: 600px;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
}
.bookmarkList{
  display: grid;
  grid-template-columns: 350px 150px 70px;
  grid-column-gap: 10px;
  border-bottom: 1px solid lightgray;
}
.bookmark_title{
  font-size: 25px;
  color: #617CC2;
}
.bookmark_date{
  font-size: 15px;
  margin-top: 70px;
  margin-bottom: 0;
}
.bookmark_prefix{
  font-size: 15px;
  color: #617CC2;
  margin-top: 5px;
}
.bookmark_img{
  width: 30px;
  height: 30px;
}
.bookmark_count{
  font-size: 20px;
  align-items: center;
  display: flex;
}
</style>