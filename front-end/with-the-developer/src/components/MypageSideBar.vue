<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li>
        <button @click="navigateTo('info')">내 프로필</button>
      </li>
      <li>
        <button @click="navigateTo('bookmark/team')">북마크</button>
      </li>
      <li>
        <button @click="navigateTo('post/community')">내 게시글</button>
      </li>
      <li>
        <button @click="navigateTo('resMsg')">쪽지</button>
      </li>
      <li>
        <button @click="navigateTo('orders')">주문내역</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from "@/router"
const navigateTo = (type) => {
  router.push(`/mypage/${type}`);
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 320px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;  /* inner white */
  margin: 100px 0 0 150px;
  white-space: nowrap;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-menu li {
  margin-bottom: 20px;
  border-bottom: 1px solid black;
}

button {
  width: 160px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  color: #000;
}

button:hover {
  font-weight: bold;
  color: #1b5ac2;
}

*{
  font-family: "Neo둥근모 Pro";
  margin: 0 auto;
}

</style>
