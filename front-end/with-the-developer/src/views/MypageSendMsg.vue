<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import MypageSideBar from "@/components/MypageSideBar.vue";
import router from "@/router/index.js";


const msgList = ref([]);
const selectedList = ref([]);


const fetchReqMsgList = async () => {
  return (await axios.get('msg/req', {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    }
  })).data;
}
onMounted(async () => {
      msgList.value = await fetchReqMsgList();
    }
)

// 전체 선택/해제 기능
const toggleSelectAll = (event) => {
  if (event.target.checked) {
    // 모든 메시지의 msgCode를 selectedList에 추가
    selectedList.value = msgList.value.map(msg => msg.msgCode);
  } else {
    // 선택 해제 시 selectedList를 빈 배열로 초기화
    selectedList.value = [];
  }
};
// 삭제 확인 후 선택된 메시지를 삭제하는 메서드
const confirmDeleteSelectedMessages = () => {
  // 삭제 확인 alert
  const confirmed = window.confirm('선택한 메시지를 삭제하시겠습니까?');

  if (confirmed) {
    deleteSelectedMessages(); // 확인 시 삭제 메서드 호출
  }
};
// 선택된 메시지를 삭제하는 메서드
const deleteSelectedMessages = async () => {
  try {
    const deletePromises = selectedList.value.map(msgCode => {
      return axios.delete(`msg/sender/${msgCode}`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        }
      });
    });

    await Promise.all(deletePromises);

    // 삭제 후 msgList와 selectedList 업데이트
    msgList.value = await fetchReqMsgList();
    selectedList.value = [];
    alert('선택된 메시지가 삭제되었습니다.');
  } catch (error) {
    console.error('메시지 삭제 중 오류 발생:', error);
    alert('메시지 삭제에 실패했습니다.');
  }
};


const moveToRes = () => {
  router.push('/mypage/resMsg');
}
const moveToSend = () => {
  router.push('/mypage/sendMsg');
}
const moveToRead = () => {
  router.push('/mypage/readMsg');
}

</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <div id="header">
        <h2>쪽지</h2>
        <ul>
          <li><button class="header_button" id="res" @click="moveToRes">수신쪽지</button></li>
          <li><button class="header_button" id="isRead" @click="moveToRead">읽은쪽지</button></li>
          <li><button class="header_button" id="send" @click="moveToSend">발신쪽지</button></li>
          <li><button class="header_button" id="block">차단관리</button></li>
        </ul>
      </div>
      <article id = "info">
        <div id="tool_bar">
          <input type="checkbox" id="selectAll" @change="toggleSelectAll($event)">
          <p id="delete" @click="confirmDeleteSelectedMessages">삭제</p>
        </div>
        <hr>
        <div class="resMsg" v-for="msg in msgList">
          <input type="checkbox" v-model="selectedList" :value="msg.msgCode">
          <p class="msg_content">{{msg.msgContent}}</p>
          <p class="msg_date">{{ msg.createdDate }}</p>
          <p class="msg_id">{{ msg.userCode }}</p>
        </div>

      </article>
    </div>
  </section>

</template>

<style scoped>
section{
  display: flex;
  height: 700px;
}
#content{
  margin: 35px 0 0 100px;
}
#info{
  width: 600px;
  height: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
}

#header {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

ul {
  list-style: none;
  display: flex;
}
li {
  margin-right: 20px;
}
.header_button{
  font-family: "Neo둥근모 Pro";
  width: 90px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 15px;
}
.header_button:hover{
  border-color: #617CC2;
  color: #617CC2;
}
#send{
  border-color: #617CC2;
  color: #617CC2;
}
#tool_bar{
  display: flex;
  padding-left: 10px;
  margin-bottom: 0;
}
hr {
  margin: 0;
}
#delete:hover{
  cursor: pointer;
}
#delete{
  color: #FF3838;
  margin-right: 10px;
  margin-left: 10px;
}
.resMsg{
  display: flex;
  padding-left: 10px;
  font-size: 14px;
  border-bottom: 1px solid lightgray;
}
.resMsg > p{
  margin-left : 20px;
  margin-right: 10px;
}
[type="checkbox"]{
  width: 17px;
}
.send_button{
  font-family: "Neo둥근모 Pro";
  width: 50px;
  height: 20px;
  margin-top: 10px;
  margin-left: 10px;
  border: 1px solid lightgray;
  border-radius: 15px;
}
.send_button:hover{
  border-color: #617CC2;
  color: #617CC2;
}
.msg_content{
  width: 200px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>