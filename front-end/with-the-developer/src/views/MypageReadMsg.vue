<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import MypageSideBar from "@/components/MypageSideBar.vue";
import router from "@/router/index.js";
import MypageMsgMenu from "@/components/MypageMsgMenu.vue";


const msgList = ref([]);
const fetchReqMsgList = async () => {
  return (await axios.get('msg/res/isRead', {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
    }
  })).data;
}

onMounted(async () => {
      msgList.value = await fetchReqMsgList();
    }
)

</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <MypageMsgMenu/>
      <article id = "info">
        <div id="tool_bar">
          <input type="checkbox" id="selectAll">
          <p id="delete">삭제</p>
        </div>
        <hr>
        <div class="resMsg" v-for="msg in msgList">
          <input type="checkbox" class="msg_checkbox" value="{{msg.msgCode}}">
          <p class="msg_content">{{msg.msgContent}}</p>
          <p class="msg_date">{{ msg.createdDate }}</p>
          <p class="msg_id">{{ msg.userCode }}</p>
          <button class="send_button">답장</button>
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
#tool_bar{
  display: flex;
  padding-left: 10px;
  margin-bottom: 0;
}
hr{
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