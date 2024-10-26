<template>
  <div class="post-create-container">
    <h1 class="title">팀모집 수정</h1>

    <div class="form-section">
      <label for="title">제목</label>
      <input
          type="text"
          id="title"
          v-model="teamPostTitle"
          placeholder="제목을 입력하세요"
      />
    </div>

    <div class="form-section">
      <label for="content">내용</label>
      <textarea
          id="content"
          v-model="teamContent"
          rows="10"
          placeholder="내용을 입력하세요"
      ></textarea>
    </div>

    <div class="form-section">
      <label for="recruitment-period">모집 기간</label>
      <input
          type="datetime-local"
          id="recruitment-period"
          v-model="teamPostDeadLine"
      />
    </div>

    <div class="form-section">
      <label>태그 선택</label>
      <div class="tag-list">
        <button
            v-for="(tag, index) in jobTags"
            :key="index"
            :class="{ selected: selectedTags.includes(tag.jobTagName) }"
            @click="toggleTag(tag.jobTagName)"
        >
          {{ tag.jobTagName }}
        </button>
      </div>
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
      <button @click="submitPost" class="submit-button">수정</button>
      <button @click="cancel" class="cancel-button">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const teamPostTitle = ref('');
const teamContent = ref('');
const teamPostDeadLine = ref('');
const selectedTags = ref([]);
const jobTags = ref([]);
const selectedImages = ref([]);
const previewImages = ref([]);

// 게시글 ID를 라우터에서 받아오기
const postId = route.params.id;

onMounted(async () => {
  try {
    // 태그 데이터 불러오기
    const tagResponse = await axios.get('/job-tag');
    jobTags.value = tagResponse.data;

    // 게시글 정보 불러오기
    const postResponse = await axios.get(`/public/team/post/${postId}`);
    const postData = postResponse.data;

    // 기존 데이터로 입력 필드 초기화
    teamPostTitle.value = postData.teamPostTitle;
    teamContent.value = postData.teamContent;

    // 선택된 태그 초기화
    selectedTags.value = postData.jobTagNames;
  } catch (error) {
    console.error('게시글 불러오기 실패:', error);
  }
});

// 태그 선택/해제 토글
const toggleTag = (tagName) => {
  const index = selectedTags.value.indexOf(tagName);
  if (index > -1) {
    selectedTags.value.splice(index, 1); // 선택 해제
  } else {
    selectedTags.value.push(tagName); // 선택
  }
};

// 이미지 선택 처리
const onImageSelect = (event) => {
  const files = event.target.files;
  selectedImages.value = Array.from(files);

  previewImages.value = selectedImages.value.map((file) =>
      URL.createObjectURL(file)
  );
};

// 게시글 수정
const submitPost = async () => {
  if (!teamPostTitle.value || !teamContent.value || !teamPostDeadLine.value) {
    alert('제목, 내용, 모집기간을 모두 입력하세요.');
    return;
  }

  // "yyyy-MM-ddTHH:mm" → "yyyy-MM-dd HH:mm:ss" 형식으로 변환
  const localDateTime = new Date(teamPostDeadLine.value);
  const formattedDateTime = `${localDateTime.getFullYear()}-${String(
          localDateTime.getMonth() + 1
      ).padStart(2, '0')}-${String(localDateTime.getDate()).padStart(2, '0')} ` +
      `${String(localDateTime.getHours()).padStart(2, '0')}:${String(
          localDateTime.getMinutes()
      ).padStart(2, '0')}:${String(localDateTime.getSeconds()).padStart(2, '0')}`;

  const dto = {
    teamPostCode: postId,
    teamPostTitle: teamPostTitle.value,
    teamContent: teamContent.value,
    teamPostDeadLine: formattedDateTime,
    jobTagNames: selectedTags.value,
    userCode: localStorage.getItem('userCode'),
  };

  const formData = new FormData();
  formData.append(
      'teamPostDTO',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
  );

  // 이미지 파일 추가 (필요 시 기존 이미지를 포함할 수도 있음)
  selectedImages.value.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.put(`/team/post/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    });
    alert('게시글이 수정되었습니다.');
    await router.push('/team');
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    alert('게시글 수정에 실패했습니다.');
  }
};

const cancel = () => {
  router.push('/team');
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

input[type="text"],
input[type="datetime-local"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: none;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-list button {
  padding: 8px 12px;
  background-color: #ddd;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tag-list button.selected {
  background-color: #617CC2;
  color: white;
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

.submit-button,
.cancel-button {
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
