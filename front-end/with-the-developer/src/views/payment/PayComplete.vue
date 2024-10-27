<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
const orderUid = route.params.orderUid;
</script>

<template>
  <div id="pay_complete_msg_box">
    <div>
      <div id="pay_complete_msg">결제가 완료되었습니다.</div>
      <hr>
      <div id="order_num_box">
        <div id="order_num_title">주문번호</div>
        <div id="order_num">{{ orderUid }}</div>
      </div>
    </div>
    <button>결제 상세 내역</button>
  </div>
</template>

<style scoped>
* {
  font-family: "Neo둥근모 Pro";
}

#pay_complete_msg_box {
  width: 340px;
  margin: 120px auto;
}

#pay_complete_msg {
  text-align: center;
  font-size: 20px;
  padding-bottom: 20px;
}

#order_num_box {
  padding: 16px 0 52px 0;
  width: 340px;
}

#order_num_title {
  text-align: center;
  font-size: 18px;
}

#order_num {
  text-align: center;
  font-size: 17px;
  margin-top: 7px;
}

hr {
  width: 340px;
  border: 1px solid #D4D4D4;
}

button {
  width: 320px;
  height: 64px;
  border-radius: 24px;
  background-color: #94B1F5;
  border: transparent;
  color: white;
  font-size: 18px;
  margin: 0 10px;
}

button:hover {
  cursor: pointer;
}
</style>