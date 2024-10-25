<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import MypageSideBar from "@/components/MypageSideBar.vue";
import MypageMsgMenu from "@/components/MypageMsgMenu.vue";

export default {
  components: {MypageMsgMenu, MypageSideBar},
  setup() {
    const msgList = ref([]);
    const selectedList = ref([]);
    const router = useRouter();

    const fetchResMsgList = async () => {
      return (await axios.get('msg/res/unread', {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        }
      })).data;
    }

    onMounted(async () => {
      msgList.value = await fetchResMsgList();
    });

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

    // 읽음 확인 후 선택된 메시지를 삭제하는 메서드
    const confirmReadSelectedMessages = () => {
      // 읽음 확인 alert
      const confirmed = window.confirm('선택한 메시지를 읽음 처리 하시겠습니까?');

      if (confirmed) {
        readSelectedMessages(); // 확인 시 삭제 메서드 호출
      }
    };
    // 선택된 메시지를 읽음 처리 하는 메서드
    const readSelectedMessages = async () => {
      try {
        const readPromises = selectedList.value.map(msgCode => {
          return axios.put(`msg/${msgCode}`, [],{
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            }
          });
        });

        await Promise.all(readPromises);

        // 읽음 후 msgList와 selectedList 업데이트
        msgList.value = await fetchResMsgList();
        selectedList.value = [];
        alert('선택된 메시지가 읽음 처리 되었습니다.');
      } catch (error) {
        console.error('메시지 읽음 처리 중 오류 발생:', error);
        alert('메시지 읽음 처리에 실패했습니다.');
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
          return axios.delete(`msg/receiver/${msgCode}`, {
            headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
            }
          });
        });

        await Promise.all(deletePromises);

        // 삭제 후 msgList와 selectedList 업데이트
        msgList.value = await fetchResMsgList();
        selectedList.value = [];
        alert('선택된 메시지가 삭제되었습니다.');
      } catch (error) {
        console.error('메시지 삭제 중 오류 발생:', error);
        alert('메시지 삭제에 실패했습니다.');
      }
    };

    return {
      msgList,
      selectedList,
      toggleSelectAll,
      confirmDeleteSelectedMessages,
      confirmReadSelectedMessages
    };
  }
}
</script>

<template>
  <section>
    <MypageSideBar/>
    <div id="content">
      <MypageMsgMenu/>
      <article id = "info">
        <div id="tool_bar">
          <input type="checkbox" id="selectAll" @change="toggleSelectAll($event)">
          <p id="read" @click="confirmReadSelectedMessages">읽음</p>
          <p id="delete" @click="confirmDeleteSelectedMessages">삭제</p>
        </div>
        <hr>
        <div class="resMsg" v-for="msg in msgList" :key="msg.msgCode">
          <input type="checkbox" v-model="selectedList" :value="msg.msgCode">
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
#read{
  color: #7A7A7A;
  margin-right: 10px;
  margin-left: 20px;
}
#read, #delete:hover{
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