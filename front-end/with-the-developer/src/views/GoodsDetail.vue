<script setup>

</script>

<template>
  <div>
    <div id="goods_summary_box" class="flex">
      <div><img src="../assets/images/goods.png"></div>
      <div id="goods_summary_text_box">
        <div id="goods_title_text">커스텀 목도리 곰돌이 에어팟</div>
        <br>
        <div id="price_text">
          <span>13,400</span>
          <span>원</span>
        </div>
        <div id="quantity_text_box" class="flex">
          <div>수량</div>
          <div id="quantity_box">
            <span class="pointer">-</span>
            <span>1</span>
            <span class="pointer">+</span>
          </div>
        </div>
        <div id="price_text_box" class="flex">
          <div>총 상품금액 </div>
          <div>13,400원</div>
        </div>
        <button>장바구니</button>
      </div>
    </div>
    <hr>
    <div id="goods_detail_box">
      <div>커스텀 목도리 곰돌이 에어팟 케이스</div>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: "Neo둥근모 Pro";
  margin: 0 auto;
  box-sizing: border-box;
}

.flex {
  display: flex;
}

#goods_summary_box img {
  width: 360px;
  height: 360px;
  border-radius: 0 ;
}

#goods_summary_box {
  width: 800px;
  margin: 30px auto;
  justify-content: space-between;
}

#goods_summary_text_box {
  width: 380px;
  padding-top: 48px;
}

#goods_title_text {
  font-size: 22px;
}

#price_text span:first-child {
  font-size: 22px;
}

#quantity_text_box {
  align-items: center;
  width: 200px;
  margin-top: 36px;
  margin-bottom: 74px;
  margin-left: 0;
}


#quantity_box {
  border: #6C94D0 1px solid;
  border-radius: 30px;
  width: 90px;
  height: 35px;
  font-size: 20px;
  margin-left: 20px;
  justify-content: flex-start;
}

#quantity_box > span {
  display: inline-block;
  width: 29px;
  text-align: center;
  padding: 8px 0;
}

#price_text_box {
  float: right;
  align-items: baseline;
}

#price_text_box > div:last-child {
  font-size: 22px;
  margin-left: 14px;
}

button {
  width: 380px;
  height: 58px;
  background-color: #94B1F5;
  border: none;
  border-radius: 24px;
  color: white;
  font-size: 16px;
  margin-top: 24px;
}

hr {
  border: #C0C0C0 1px solid;
  width: 820px;
}

#goods_detail_box {
  width: 818px;
  margin: 0 auto;
}
#goods_detail_box {
  font-size: 22px;
  text-align: center;
  margin-top: 50px;
}
</style>

