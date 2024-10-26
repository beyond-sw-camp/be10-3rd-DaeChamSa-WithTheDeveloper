<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  blueModalValue: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
})

const emit = defineEmits(['update:blueModalValue', 'confirm']);


const closeBlueModal = () => {
  emit('update:blueModalValue', false);
}

const handleConfirm = () => {
  emit('confirm');
  closeBlueModal(); // 확인버튼 눌러도 모달창 닫혀야하므로
}

</script>

<template>
  <div v-if="blueModalValue" class="black_background" @click.self="closeBlueModal">
    <div class="blue_modal_box">
      <div class="blue_design blue_modal_title">{{ title }}</div>
      <div class="blue_modal_content">
        <div>{{ content }}</div>
        <div class="blue_modal_buttons_box">
          <button class="blue_design" @click="handleConfirm">확인</button>
          <button @click="closeBlueModal">취소</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  font-family: "Neo둥근모 Pro";
  box-sizing: border-box;
}

.black_background {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
}

.blue_modal_box {
  border: #617CC2 1px solid;
  background-color: white;
  width: 680px;
  height: 220px;
  margin: auto
}

.blue_design {
  background-color: #617CC2;
  color: white;
}

.blue_modal_title {
  height: 45px;
  line-height: 45px;
  padding-left: 16px;
  font-size: 18px;
}

.blue_modal_content {
  width: 400px;
  height: 100px;
  margin: 50px auto;
}

.blue_modal_content > div:first-child {
  text-align: center;
  font-size: 17px;
}

.blue_modal_buttons_box {
  text-align: center;
  margin-top: 16px;
}

.blue_modal_buttons_box > button:last-child {
  border: 1px solid;
}

button {
  cursor: pointer;
  width: 80px;
  height: 40px;
  margin: 10px;
  border-radius: 3px;
  font-size: 15px;
  border: 1px solid;
}
</style>