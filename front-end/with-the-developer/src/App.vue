<script setup>

import Footer from "@/components/Footer.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
  <SearchBar/>
  <NavigationBar/>
  <main class="main">
    <RouterView :key="$route.fullPath"/>
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>
  *{
    font-family: "Neo둥근모 Pro";
    margin: 0 auto;
  }
  footer{
    margin-top: 10vh;
  }
  .main{
    flex-grow: 1;
    padding: 20px;
    background: white;
  }

</style>
