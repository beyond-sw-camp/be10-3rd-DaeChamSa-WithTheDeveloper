<script setup>

import MypageSideBar from "@/components/MypageSideBar.vue";
import MypageBookmarkMenu from "@/components/MypageBookmarkMenu.vue";
</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <MypageBookmarkMenu/>
      <article id = "info">
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
  background-color: #F2F6FF;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>