<template>
  <div class="post-create-container">
    <h1 class="title">게시글 수정</h1>

    <div class="form-section">
      <label for="title">제목</label>
      <input
          type="text"
          id="title"
          v-model="comuSubject"
          placeholder="제목을 입력하세요"
      />
    </div>

    <div class="form-section">
      <label for="content">내용</label>
      <textarea
          id="content"
          v-model="comuContent"
          rows="10"
          placeholder="내용을 입력하세요">
      </textarea>
    </div>

    <div class="form-section">
      <label for="image">이미지 선택</label>
      <input
          type="file"
          id="image"
          multiple
          @change="onImageSelect"
          accept="image/*"
      />
      <div v-if="previewImages.length" class="image-preview">
        <img
            v-for="(image, index) in previewImages"
            :key="index"
            :src="image"
            alt="이미지 미리보기"
        />
      </div>
    </div>

    <div class="button-group">
      <button @click="submitEdit" class="submit-button">수정</button>
      <button @click="cancel" class="cancel-button">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// 상태 정의
const comuSubject = ref('');
const comuContent = ref('');
const selectedImages = ref([]);
const previewImages = ref([]);
const router = useRouter();
const route = useRoute();

// 기존 게시글 데이터를 가져와 폼에 채워 넣기
const fetchPostData = async () => {
  const comuCode = route.params.comuCode;
  try {
    const response = await axios.get(`/public/comu/post/${comuCode}`);
    const post = response.data;
    comuSubject.value = post.comuSubject;
    comuContent.value = post.comuContent;
  } catch (error) {
    console.error('게시글 조회 오류:', error);
  }
};

// 이미지 선택 처리
const onImageSelect = (event) => {
  const files = event.target.files;
  selectedImages.value = Array.from(files); // 파일 배열 저장
  previewImages.value = selectedImages.value.map((file) =>
      URL.createObjectURL(file)
  );
};

// 수정 요청 보내기
const submitEdit = async () => {
  const comuCode = route.params.comuCode;

  const formData = new FormData();
  formData.append(
      'comuPostUpdateDTO',
      new Blob(
          [JSON.stringify({ comuCode: comuCode, comuSubject: comuSubject.value, comuContent: comuContent.value })],
          { type: 'application/json' }
      )
  );

  selectedImages.value.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.put(`/comu/post`, formData, {
      headers: { 'Content-Type': 'multipart/form-data',
      Authorization: `${token}`},
    });
    alert('게시글이 수정되었습니다.');
    await router.push(`/community/${comuCode}`);
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    alert('게시글 수정에 실패했습니다.');
  }
};

// 취소 버튼 처리
const cancel = () => {
  router.push(`/community/${route.params.comuCode}`);
};

onMounted(fetchPostData);
</script>

<style scoped>
.post-create-container {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #617CC2;
  border-radius: 8px;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #617CC2;
  margin-bottom: 20px;
}

.form-section {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"], textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: none;
}

input[type="file"] {
  margin-top: 10px;
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-top: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.submit-button, .cancel-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.submit-button {
  background-color: #617CC2;
  color: white;
}

.cancel-button {
  background-color: #ddd;
}
</style>
