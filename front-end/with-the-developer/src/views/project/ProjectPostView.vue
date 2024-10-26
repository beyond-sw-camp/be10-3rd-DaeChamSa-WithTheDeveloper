<template>
  <div class="post-detail">
    <div class="post-header">
      <span class="board-category">프로젝트 자랑</span>
      <div class="action-buttons">
        <button @click="goToList">목록</button>
        <template v-if="isAuthor">
          <button @click="editPost">수정</button>
          <button @click="confirmDeletePost">삭제</button>
        </template>
        <template v-else-if="isLogin">
          <button @click="openReportModal">신고</button>
        </template>
      </div>
    </div>

    <hr/>

    <div class="post-title">
      <h1>{{ post.projPostTitle }}</h1>
      <span class="post-date">{{ formatDate(post.createdDate) }}</span>
    </div>

    <hr/>

    <div class="post-content">
      <p>{{ post.projPostContent }}</p>

      <!-- URL 버튼 추가 -->
      <div v-if="post.projUrl" class="url-button">
        <button @click="openProjectUrl">프로젝트 주소</button>
      </div>

      <div v-if="post.images && post.images.length" class="image-slider">
        <swiper
            :slides-per-view="1"
            :navigation="true"
            :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(image, index) in post.images" :key="index">
            <img :src="getImageUrl(image.fileName)" alt="게시글 이미지"/>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <hr/>

    <div class="post-footer">
      <div class="author-info">
        <span>{{ post.userNick }}</span>
      </div>
      <div class="proj-tags">
        <span v-for="(tag, index) in post.projTagContents" :key="index" class="tag">
          #{{ tag }}
        </span>
      </div>
      <div class="post-actions">
        <template v-if="!isAuthor && isLogin">
          <button @click="openMessageModal">쪽지</button>
          <button>북마크</button>
          <span>{{ post.bookmarkCount }}</span>
        </template>
      </div>
    </div>

    <hr/>

    <div class="comment-input">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요..."/>
      <button @click="submitComment">댓글 등록</button>
    </div>

    <hr/>

    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-author">{{ comment.userNick }}</div>
        <div class="comment-content">{{ comment.projCmtContent }}</div>
        <div class="comment-date">{{ formatDate(comment.createdDate) }}</div>
        <button v-if="isCmtAuthor(comment) && isLogin" @click="confirmDeleteComment(comment.projCmtCode)">삭제</button>
      </div>
    </div>

    <!-- 모달 영역 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeMessageModal">&times;</span>
        <h2>쪽지 보내기</h2>
        <textarea v-model="msgContent" placeholder="메시지를 입력하세요..."></textarea>
        <button @click="sendMessage">전송</button>
      </div>
    </div>

    <!-- 신고 모달 영역 -->
    <div v-if="isReportModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeReportModal">&times;</span>
        <h2>신고하기</h2>
        <textarea v-model="repoDescription" placeholder="신고 상세 내용을 입력하세요..."></textarea>
        <select v-model="reportReasonCategory">
          <option value="">신고 사유 선택</option>
          <option value="기타">기타</option>
          <option value="부적절한 컨텐츠입니다.">부적절한 컨텐츠입니다.</option>
          <option value="서비스 규칙 위반입니다.">서비스 규칙 위반입니다.</option>
          <option value="스팸 및 광고입니다.">스팸 및 광고입니다.</option>
        </select>
        <button @click="submitReport">신고하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {BASE_IMAGE_URL} from '@/config/image-base-url.js';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/swiper-bundle.css'; // Swiper 스타일

const route = useRoute();
const router = useRouter();
const projPostCode = route.params.id; // URL에서 게시글 ID 추출

const post = ref({});
const comments = ref([]);
const newComment = ref('');
const msgContent = ref(''); // 쪽지 내용
const isModalOpen = ref(false); // 모달 상태
const currentUserCode = Number(localStorage.getItem('userCode')); // 현재 로그인한 사용자 ID

const isReportModalOpen = ref(false);
const repoDescription = ref('');
const reportReasonCategory = ref('');


// 게시글 작성자인지 확인
const isAuthor = computed(() => post.value.userCode === currentUserCode);
const isCmtAuthor = (comment) => comment.userCode === currentUserCode;

const isLogin = computed(() => localStorage.getItem('accessToken') !== null);

// 이미지 URL 생성 함수
const getImageUrl = (fileName) => `${BASE_IMAGE_URL}/${fileName}`;

// 게시글 상세 조회
const fetchPost = async () => {
  try {
    const response = await axios.get(`/public/proj/post/${projPostCode}`);
    post.value = response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
  }
};

// URL
const openProjectUrl = () => {
  if (post.value.projUrl) {
    window.open(post.value.projUrl, '_blank');
  }
};

// 댓글 목록 조회
const fetchComments = async () => {
  try {
    const response = await axios.get(`/public/proj/post/${projPostCode}/cmt`);
    comments.value = response.data;
  } catch (error) {
    console.error('댓글 조회 실패:', error);
  }
};

// 댓글 등록
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.post(
        `/proj/post/${projPostCode}/cmt`,
        {projCmtContent: newComment.value}, // DTO에 맞춰 수정
        {
          headers: {
            Authorization: `${token}`,
          },
        }
    );
    newComment.value = ''; // 입력란 초기화
    await fetchComments(); // 댓글 목록 갱신
  } catch (error) {
    console.error('댓글 등록 실패:', error);
  }
};

// 댓글 삭제 확인
const confirmDeleteComment = (commentId) => {
  const confirmed = confirm('정말로 이 댓글을 삭제하시겠습니까?');
  if (confirmed) {
    deleteComment(commentId);
  }
};

// 댓글 삭제 메서드
const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.delete(`/proj/post/${projPostCode}/cmt/${commentId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    await fetchComments(); // 댓글 목록 갱신
    alert('댓글이 삭제되었습니다.');
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    alert('댓글 삭제에 실패했습니다.');
  }
};

// 게시글 삭제 확인
const confirmDeletePost = () => {
  const confirmed = confirm('정말로 이 게시글을 삭제하시겠습니까?');
  if (confirmed) {
    deletePost();
  }
};

// 게시글 삭제
const deletePost = async () => {
  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.delete(`/proj/post/${projPostCode}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    await router.push('/project'); // 삭제 후 목록 페이지로 이동
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
  }
};

// 게시글 수정 페이지로 이동
const editPost = () => router.push(`/project/update/${projPostCode}`);

// 목록 페이지로 이동
const goToList = () => router.push('/project');

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// 모달 열기
const openMessageModal = () => {
  isModalOpen.value = true;
};

// 모달 닫기
const closeMessageModal = () => {
  isModalOpen.value = false;
  msgContent.value = ''; // 모달 닫을 때 입력 내용 초기화
};

// 쪽지 보내기
const sendMessage = async () => {
  const recipientUserCode = post.value.userCode; // 게시글 주인의 userCode
  if (!msgContent.value.trim()) return; // 내용이 비어있으면 반환

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.post(
        '/msg',
        {recipientUserCode, msgContent: msgContent.value}, // DTO에 맞춰 수정
        {
          headers: {
            Authorization: `${token}`,
          },
        }
    );
    closeMessageModal(); // 메시지 전송 후 모달 닫기
  } catch (error) {
    console.error('쪽지 전송 실패:', error);
  }
};

// 신고 모달 열기
const openReportModal = () => {
  isReportModalOpen.value = true;
};

// 신고 모달 닫기
const closeReportModal = () => {
  isReportModalOpen.value = false;
  repoDescription.value = ''; // 입력 내용 초기화
  reportReasonCategory.value = ''; // 선택된 카테고리 초기화
};

// 신고 등록
const submitReport = async () => {
  if (!repoDescription.value.trim() || !reportReasonCategory.value) {
    alert('신고 상세 내용과 사유를 모두 입력해주세요.');
    return;
  }

  const postCode = projPostCode; // 해당 게시글의 comuCode 값
  const reportTypePara = 'PROJPOST';

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.post(
        '/report/create',
        {
          repoDescription: repoDescription.value,
          reportReasonCategory: reportReasonCategory.value,
        },
        {
          params: {
            postCode,
            reportTypePara,
          },
          headers: {
            Authorization: `${token}`,
          },
        }
    );
    closeReportModal(); // 모달 닫기
    alert('신고가 성공적으로 등록되었습니다.'); // 신고 성공 알림
  } catch (error) {
    console.error('신고 등록 실패:', error);
  }
};

// 컴포넌트가 마운트될 때 게시글과 댓글 조회
onMounted(() => {
  fetchPost();
  fetchComments();
});
</script>

<style scoped>
.post-detail {
  padding: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons img {
  width: 30px;
  cursor: pointer;
  margin-left: 10px;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-content {
  margin: 20px 0;
  color: #969696;
}

.url-button {
  margin-top: 10px;
}

.url-button button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.url-button button:hover {
  background-color: #45a049;
}

.image-slider img {
  height: 300px;
  width: auto;
  object-fit: cover;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
}

.tag {
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #333;
}

.comment-input {
  display: flex;
  align-items: center;
}

.comment-input textarea {
  flex: 1;
  margin-right: 10px;
}

.comment-list {
  margin-top: 10px;
}

.comment-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.comment-content {
  color: #969696;
}

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달의 z-index 설정 (기본값보다 높게) */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  text-align: center;
  z-index: 1001; /* 모달 내용의 z-index 설정 (모달보다 높게) */
}

/* 사진의 z-index를 조정 (기본값보다 낮게) */
.image-slider {
  z-index: 1; /* 사진이 모달 뒤에 있도록 설정 */
}


.close {
  cursor: pointer;
  float: right;
  font-size: 24px;
}
</style>
