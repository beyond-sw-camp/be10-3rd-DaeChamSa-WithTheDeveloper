<template>
  <div class="board-list">
    <div v-if="posts.length === 0">게시글이 없습니다.</div>
    <div v-else class="post-list">
      <div v-for="post in posts" :key="post.comuCode" class="post-item">
        <div class="post-header">
          <router-link :to="{ name: 'CommunityPostDetail', params: { id: post.comuCode } }" id="title-link">
            <h3 class="post-title">{{ post.comuSubject }}</h3>
          </router-link>
          <div class="post-user-info">
            <span class="nickname">{{ post.userNick }}</span>
          </div>
        </div>

        <div class="post-content">
          <p class="content-text">{{ truncatedContent(post.comuContent) }}</p>
        </div>

        <div class="post-footer">
          <span class="post-time">{{ formatDate(post.createdDate) }}</span>
          <button class="bookmark-button" @click="toggleBookmark(post)">
            <img :src="bookmarkedIcon" alt="북마크" id="bookmark-image" />
          </button>
          <span class="bookmark-count">{{ post.bookmarkCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

const bookmarkedIcon =
    'https://img.icons8.com/?size=100&id=82461&format=png&color=617CC2';

const toggleBookmark = async (post) => {
  try {
    const response = await axios.post('/bookmark');
    post.bookmarked = response.data.bookmarked;
    post.bookmarkCount = response.data.bookmarkCount;
  } catch (error) {
    console.error('북마크 처리 중 오류 발생:', error);
  }
};

const truncatedContent = (content) =>
    content.length > 100 ? content.slice(0, 100) + '...' : content;

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.board-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.post-item {
  border-bottom: 1px solid #617CC2;
  padding-bottom: 15px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 2rem;
  font-weight: bold;
  color: #617CC2;
  margin-left: 8%;
}

.post-user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 15%;
}

.nickname {
  font-weight: bold;
  color: #617CC2;
}

.post-content {
  margin-top: 10px;
  margin-left: 8%;
  margin-right: 30%;
  width: 50%;
}

.content-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-footer {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 75%;
}

.post-time {
  color: #969696;
}

.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 10%;
  color: #617CC2;
}

#bookmark-image {
  width: 30px;
  height: 30px;
}

#bookmark-image:hover {
  color: gold;
}

.bookmark-count {
  color: #617CC2;
}
</style>
