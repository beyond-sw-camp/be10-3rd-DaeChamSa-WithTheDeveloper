<script setup>

import MypageSideBar from "@/components/MypageSideBar.vue";
import MypageBookmarkMenu from "@/components/MypageBookmarkMenu.vue";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import router from "@/router/index.js";
const bookmarkList = ref([]);
const store = useStore();
const fetchBookmark =  async () => {
  // 북마크 목록 vuex에 초기화
  await store.dispatch('fetchItems');
  bookmarkList.value = store.getters.bookmarkList.value.filter(bookmark => bookmark.teamPostCode !== null);
}
onMounted(() => {
  fetchBookmark();
})
const moveTo = (url) => {
  router.push(url)
}
</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <MypageBookmarkMenu/>
      <article id = "info">
        <div class="bookmarks" v-for="bookmark in bookmarkList">
          <p class="bmk_title" @click="moveTo(bookmark.bmkUrl)">{{bookmark.bmkTitle}}</p>
          <p class="bmk_date">{{ bookmark.bmkCreateDate }}</p>
          <img class="bmk_icon" src="https://img.icons8.com/?size=100&id=82461&format=png&color=000000" alt="북마크이미지">
          <p>{{bookmark.bmkCount}}</p>
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
#info{
  width: 600px;
  height: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
  background-color: white;
}
.bookmarks{
  height: 50px;
  display: flex;
  border-bottom: 1px solid lightgray;
}
.bmk_title{
  cursor: pointer;
  width: 200px;
  font-size: 20px;
  text-align: center;
  color: #617CC2;
  margin: 16px;
}
.bmk_date{
  width: 200px;
}
.bmk_icon{
  width: 20px;
  height: 20px;
  margin: 12px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>