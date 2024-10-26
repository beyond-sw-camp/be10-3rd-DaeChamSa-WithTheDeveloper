<template>
  <div class="post-create-container">
    <h1 class="title">게시글 수정</h1>

    <div class="form-section">
      <label for="title">제목</label>
      <input
          type="text"
          id="title"
          v-model="projPostTitle"
          placeholder="제목을 입력하세요"
      />
    </div>

    <div class="form-section">
      <label for="content">내용</label>
      <textarea
          id="content"
          v-model="projPostContent"
          rows="10"
          placeholder="내용을 입력하세요"
      ></textarea>
    </div>

    <div class="form-section">
      <label for="url">관련 URL</label>
      <input
          type="url"
          id="url"
          v-model="projPostUrl"
          placeholder="관련된 URL을 입력하세요"
          @input="validateUrl"
      />
      <span v-if="urlError" class="error">{{ urlError }}</span>
    </div>

    <div class="form-section">
      <label for="tags">태그</label>
      <input
          type="text"
          id="tags"
          v-model="newTag"
          @keyup.enter="addTag"
          placeholder="태그를 입력하고 엔터를 누르세요"
      />
      <div class="tag-list">
        <span class="tag" v-for="(tag, index) in projTags" :key="index">
          {{ tag }}
          <button @click="removeTag(index)">x</button>
        </span>
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
      <button @click="updatePost" class="submit-button">수정 완료</button>
      <button @click="cancel" class="cancel-button">취소</button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const projPostTitle = ref('');
const projPostContent = ref('');
const projPostUrl = ref(''); // URL 입력 필드
const urlError = ref(null);
const isUrlValid = ref(false);
const selectedImages = ref([]);
const previewImages = ref([]);

const newTag = ref('');
const projTags = ref([]);

// 기존 게시글 데이터 로드
const loadPostData = async () => {
  const projPostCode = route.params.projPostCode;
  try {
    const { data } = await axios.get(`/public/proj/post/${projPostCode}`);
    projPostTitle.value = data.projPostTitle;
    projPostContent.value = data.projPostContent;
    projPostUrl.value = data.projUrl;
    projTags.value = data.projTagContents || [];
  } catch (error) {
    console.error('게시글 데이터를 불러오지 못했습니다:', error);
    alert('게시글 로딩에 실패했습니다.');
    await router.push('/project');
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

// URL 형식 검증 (정규식 사용)
const validateUrl = () => {
  const urlPattern = new RegExp(
      '^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,6})(\\/[-\\w.@:%_\\+.~#?&//=]*)*$',
      'i'
  );

  if (projPostUrl.value && !urlPattern.test(projPostUrl.value)) {
    urlError.value = '유효하지 않은 URL 형식입니다.';
    isUrlValid.value = false;
  } else {
    urlError.value = null;
    isUrlValid.value = true;
  }
};

// 태그 추가
const addTag = () => {
  if (newTag.value.trim() && !projTags.value.includes(newTag.value)) {
    projTags.value.push(newTag.value.trim());
  }
  newTag.value = '';
};

// 태그 삭제
const removeTag = (index) => {
  projTags.value.splice(index, 1);
};

// 게시글 수정
const updatePost = async () => {
  const projPostCode = route.params.projPostCode;
  if (!projPostTitle.value || !projPostContent.value) {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  const formData = new FormData();
  const dto = {
    projPostTitle: projPostTitle.value,
    projPostContent: projPostContent.value,
    projUrl: projPostUrl.value, // URL 추가
    projTagContent: projTags.value.length ? projTags.value : [], // 태그 배열 추가
  };

  formData.append(
      'projPostRequestDTO',
      new Blob([JSON.stringify(dto)], {type: 'application/json'})
  );

  selectedImages.value.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const token = localStorage.getItem('accessToken')?.trim();
    await axios.put(`/proj/post/${projPostCode}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    });
    alert('게시글이 등록되었습니다.');
    await router.push('/project');
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    alert('게시글 등록에 실패했습니다.');
  }
};

const cancel = () => {
  router.push('/project');
};

onMounted(() => {
  loadPostData();
});
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
input[type="url"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
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

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  background-color: #617CC2;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
}

.tag button {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
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
