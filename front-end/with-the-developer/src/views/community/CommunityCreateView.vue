<template>
  <div class="post-create-container">
    <h1 class="title">커뮤니티</h1>

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
      <button @click="submitPost" class="submit-button">등록</button>
      <button @click="cancel" class="cancel-button">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// 라우터 객체 사용
const router = useRouter();

// 폼 데이터 상태
const comuSubject = ref('');
const comuContent = ref('');
const selectedImages = ref([]);
const previewImages = ref([]);

// 이미지 선택 처리
const onImageSelect = (event) => {
  const files = event.target.files;
  selectedImages.value = Array.from(files); // 선택된 파일 배열 저장

  // 이미지 미리보기 URL 생성
  previewImages.value = selectedImages.value.map((file) =>
      URL.createObjectURL(file)
  );
};

// 게시글 등록
const submitPost = async () => {
  if (!comuSubject.value || !comuContent.value) {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  const formData = new FormData();

  // DTO 데이터 추가
  formData.append(
      'comuPostCreateDTO',
      new Blob(
          [JSON.stringify({ comuSubject: comuSubject.value, comuContent: comuContent.value })],
          { type: 'application/json' }
      )
  );

  // 이미지 파일 추가
  selectedImages.value.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.post('/comu/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data',
      Authorization: `${token}` },
    });
    alert('게시글이 등록되었습니다.');
    await router.push('/community');
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    alert('게시글 등록에 실패했습니다.');
  }
};

// 취소 버튼 처리
const cancel = () => {
  router.push('/community');
};
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
