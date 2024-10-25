<template>
  <div class="board-page">
    <h1 id="board-title">커뮤니티</h1>
    <div class="upper-menu">
      <div class="sort-menu">
        <label for="sortOrder"></label>
        <select id="sortOrder">
          <option value="latest">최신순</option>
          <option value="name">북마크 많은 순</option>
        </select>
      </div>
      <search-bar />
      <button class="post-button" @click="goToCreatePage">
        <img
            src="https://img.icons8.com/?size=100&id=11737&format=png&color=ffffff"
            alt="글쓰기"
            id="post"
        />
        글쓰기
      </button>
    </div>
    <CommunityBoardList :posts="posts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CommunityBoardList from '@/components/CommunityBoardList.vue';
import SearchBar from '@/components/SearchBar.vue';

const posts = ref([]);
const router = useRouter();

const goToCreatePage = () => {
  router.push('/community/create');
};

// 게시글 데이터 가져오기
const fetchPosts = async () => {
  try {
    const response = await axios.get('/public/comu/post');
    console.log(response.data); // 응답 확인
    posts.value = response.data.content || response.data; // 서버 데이터 설정
  } catch (error) {
    console.error('게시글을 불러오는 중 오류 발생:', error);
  }
};

// 컴포넌트 마운트 시 전체 데이터 가져오기
onMounted(fetchPosts);
</script>

<style scoped>
.board-page {
  padding: 20px;
  font-size: 1.2rem;
}

.upper-menu {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #A7A7A7;
}

#board-title {
  text-align: center;
}

.sort-menu {
  margin-left: 5%;
  margin-top: 1%;
}

.post-button {
  margin-right: 15%;
  background-color: #617CC2;
  border: none;
  color: #ffffff;
}

#post {
  width: 30px;
  height: 30px;
}
</style>
