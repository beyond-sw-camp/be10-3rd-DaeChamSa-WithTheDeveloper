<template>
  <div class="post-create-container">
    <h1 class="title">채용 공고</h1>

    <div class="form-section">
      <label for="title">제목</label>
      <input
          type="text"
          id="title"
          v-model="recruitTitle"
          placeholder="제목을 입력하세요"
      />
    </div>

    <div class="form-section">
      <label for="content">내용</label>
      <textarea
          id="content"
          v-model="recruitContent"
          rows="10"
          placeholder="내용을 입력하세요"
      ></textarea>
    </div>

    <div class="form-section">
      <label for="url">관련 URL</label>
      <input
          type="url"
          id="url"
          v-model="recruitUrl"
          placeholder="관련된 URL을 입력하세요"
          @input="validateUrl"
      />
      <span v-if="urlError" class="error">{{ urlError }}</span>
    </div>

    <div class="form-section">
      <label for="recruitment-period">모집 기간</label>
      <input
          type="datetime-local"
          id="recruitment-period"
          v-model="recruitStart"
      />
      <input
          type="datetime-local"
          id="recruitment-period"
          v-model="recruitEnd"
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
      <button @click="submitPost" class="submit-button">등록</button>
      <button @click="cancel" class="cancel-button">취소</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const recruitTitle = ref('');
const recruitContent = ref('');
const recruitUrl = ref(''); // URL 입력 필드
const urlError = ref(null);
const isUrlValid = ref(false);
const recruitStart = ref('');
const recruitEnd = ref('');
const selectedTags = ref([]);
const jobTags = ref([]);
const selectedImages = ref([]);
const previewImages = ref([]);

// 현재 날짜와 시간을 가져와 "초"를 00으로 설정
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // 초를 항상 "00"으로 설정
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const validateUrl = () => {
  const urlPattern = new RegExp(
      '^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,6})(\\/[-\\w.@:%_\\+.~#?&//=]*)*$',
      'i'
  );

  if (recruitUrl.value && !urlPattern.test(recruitUrl.value)) {
    urlError.value = '유효하지 않은 URL 형식입니다.';
    isUrlValid.value = false;
  } else {
    urlError.value = null;
    isUrlValid.value = true;
  }
};

// 페이지 로드시 태그 데이터 및 기본 모집 기간 설정
onMounted(async () => {
  try {
    const response = await axios.get('/job-tag');
    jobTags.value = response.data;

    // 모집 기간 기본값 설정
    recruitStart.value = getCurrentDateTime();
    recruitEnd.value = getCurrentDateTime();
  } catch (error) {
    console.error('태그 목록 불러오기 실패:', error);
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

// 게시글 등록
const submitPost = async () => {
  if (!recruitTitle.value || !recruitContent.value || !recruitStart.value || !recruitEnd.value) {
    alert('제목, 내용, 모집기간을 모두 입력하세요.');
    return;
  }

  const dto = {
    recruitTitle: recruitTitle.value,
    recruitContent: recruitContent.value,
    recruitUrl: recruitUrl.value,
    recruitStart: recruitStart.value,
    recruitEnd: recruitEnd.value,
    jobTagNames: selectedTags.value,
  };

  const formData = new FormData();
  formData.append(
      'newApplyRecruitDTO',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
  );

  // 이미지 파일 추가
  selectedImages.value.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.post('/recruit/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    });
    alert('게시글이 등록되었습니다.');
    await router.push('/recruit');
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    alert('게시글 등록에 실패했습니다.');
  }
};

const cancel = () => {
  router.push('/recruit');
};
</script>

<style scoped>
.post-create-container {
  width: 60%; /* 넓이를 좀 더 넓게 조정 */
  margin: 30px auto; /* 상단에 여백 추가 */
  padding: 30px;
  border: 1px solid #617CC2;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2.5rem;
  color: #4a6fa5;
  margin-bottom: 30px;
}

.form-section {
  margin-bottom: 25px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"],
input[type="url"],
input[type="datetime-local"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

input[type="url"]::placeholder {
  color: #999;
}

textarea {
  resize: vertical;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.recruitment-period {
  display: flex;
  gap: 10px;
}

.recruitment-period input {
  flex: 1; /* 두 날짜 입력 필드가 균등하게 배치 */
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
  transition: background-color 0.3s, transform 0.2s;
}

.tag-list button:hover {
  background-color: #bccde3;
}

.tag-list button.selected {
  background-color: #617CC2;
  color: white;
  transform: scale(1.05);
}

.image-preview img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 6px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  width: 48%;
  padding: 12px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.submit-button {
  background-color: #4a6fa5;
  color: white;
}

.submit-button:hover {
  background-color: #3a5f8f;
}

.cancel-button {
  background-color: #ddd;
}

.cancel-button:hover {
  background-color: #bbb;
}
</style>
