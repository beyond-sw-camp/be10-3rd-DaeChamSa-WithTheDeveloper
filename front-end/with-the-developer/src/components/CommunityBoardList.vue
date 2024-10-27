<template>
  <div class="board-list">
    <div v-if="posts.length === 0" class="no-posts-message">게시글이 없습니다.</div>
    <div v-else class="post-list">
      <div v-for="post in posts" :key="post.comuCode" class="post-item">
        <div class="post-header">
          <router-link :to="{ name: 'CommunityPostDetail', params: { id: post.comuCode } }" class="title-link">
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
          <div class="bookmark-container">
            <button class="bookmark-button" @click="toggleBookmark(post)">
              <img :src="bookmarkedIcon" alt="북마크" class="bookmark-image" />
            </button>
            <span class="bookmark-count">{{ post.bookmarkCount }}</span>
          </div>
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

const bookmarkedIcon = 'https://img.icons8.com/?size=100&id=82461&format=png&color=617CC2';

const toggleBookmark = async (post) => {
  const userCode = localStorage.getItem('userCode'); // 사용자 코드 가져오기

  const bookmarkData = {
    bmkUrl: `/community/${post.comuCode}`,
    bmkTitle: post.comuSubject,
    postType: 'comuPost',
    postCode: post.comuCode,
    userCode: userCode,
  };

  try {
    const response = await axios.post('/bookmark', bookmarkData);
    post.bookmarked = response.data.bookmarked; // 북마크 상태 업데이트
    post.bookmarkCount = response.data.bookmarkCount; // 북마크 개수 업데이트
  } catch (error) {
    console.error('북마크 처리 중 오류 발생:', error);
  }
};

const truncatedContent = (content) => (content.length > 100 ? content.slice(0, 100) + '...' : content);

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
  background-color: #f9f9f9;
  border-radius: 8px;
}

.no-posts-message {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}

.post-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-link {
  text-decoration: none;
}

.post-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #617CC2;
  margin: 0;
}

.post-user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nickname {
  font-weight: bold;
  color: #617CC2;
}

.post-content {
  margin-top: 10px;
  margin-left: 0;
  margin-right: 0;
}

.content-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #444;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.post-time {
  color: #969696;
  font-size: 0.9rem;
}

.bookmark-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.bookmark-button {
  background: none;
  border: none;
  cursor: pointer;
}

.bookmark-image {
  width: 25px;
  height: 25px;
  transition: transform 0.3s;
}

.bookmark-button:hover .bookmark-image {
  transform: scale(1.2);
}

.bookmark-count {
  color: #617CC2;
  font-size: 1rem;
}
</style>
