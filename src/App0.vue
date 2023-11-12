<script setup lang="ts">
type Image = {
  [key: string]: string;
};
const images: Image = {
  "01": "/images/01.png",
  "02": "/images/02.png",
  "03": "/images/03.png",
  "04": "/images/04.png",
  "05": "/images/05.png",
};
</script>

<template>
  <h1>面試題目</h1>

  <section>
    <h2>實作方式</h2>
    <p>請使用 Codesandbox 先做 Fork 後，開始進行實作。</p>
    <p>實作完成後，請回傳 URL。</p>
  </section>

  <section>
    <h2>指定技術</h2>
    <p>前端框架：Vue3</p>
    <p>狀態管理：Pinia</p>
    <p>樣式框架：Element Plus</p>
    <p>表單驗證相關套件：vee-validate 與 @vee-validate/yup</p>
  </section>

  <hr />

  <section>
    <h2>使用者情境與實作說明</h2>
    <h3>1. 實作「搜尋欄」與「表格」，表格呈現所有資料的狀態。</h3>
    <span>表格中的功能欄位中，藍色的按鈕是「編輯Modal」的按鈕。</span>
    <img :src="images['01']" alt="" />
  </section>

  <section>
    <h3>2. 在標題Input輸入關鍵字後，按下「查詢」按鈕可以搜尋表格資料</h3>
    <span>標題Input為Empty時，按下「查詢」會拿到所有表格資料。</span>
    <img :src="images['02']" alt="" />
  </section>

  <section>
    <h3>3. 點擊搜尋欄的「新增」按鈕，會開啟新增Modal。</h3>
    <span>「儲存」按鈕是新增內容到表格上</span>
    <span>「取消」按鈕是清空Modal內容，並關閉Modal。</span>
    <img :src="images['03']" alt="" />
  </section>

  <section>
    <h3>4. 如果沒有輸入任何內容就點擊「儲存」，必須顯示表單驗證的錯誤訊息。</h3>
    <span>請根據該欄位是否為必填來做驗證</span>
    <img :src="images['04']" alt="" />
  </section>

  <section>
    <h3>5. 點擊表格的「編輯」按鈕，會開啟編輯Modal。</h3>
    <span>打開編輯Modal時，會預先帶入原本的資料狀態</span>
    <span>「儲存」按鈕是編輯內容並更新到表格上</span>
    <span>「取消」按鈕是關閉Modal。</span>
    <img :src="images['05']" alt="" />
  </section>

  <hr />

  <section>
    <h2>補充說明 - 關於 Modal</h2>
    <h3>廣告標題：Input</h3>
    <h3>廣告狀態：Select (啟用 / 未啟用)</h3>
    <h3>廣告連結：Input</h3>
    <h3>廣告圖片：上傳圖片檔案</h3>
    <h2>補充說明 - 關於實作</h2>
    <h3>* 請使用「全部的指定技術」，如有其他需求可自行添加其他技術或工具。</h3>
    <h3>* 建議使用 json-server 模擬「串接API的資料流」。</h3>
    <h3>* 可自行選擇是否要使用 TypeScript，如果有會更好！</h3>
    <h2>補充說明 - 畫面切版</h2>
    <h3>不用一模一樣，有80%像就好。</h3>
  </section>

  <hr />

  <section>
    <h2>測驗意圖</h2>
    <p>
      上述指定的技術是目前公司專案正在使用的<br />
      測驗的題目也是目前開發上常碰到的需求<br />
      我希望能找一位即戰力與我一同開發與維護公司的專案!
    </p>
    <h2>希望透過測驗看到的能力</h2>
    <h3>1. 模組化設計</h3>
    <h3>2. 熟悉資料流的處理(同步/非同步)</h3>
    <h3>3. 與狀態管理工具有好的搭配，實作出方便維護的設計。</h3>
    <h3>4. 熟悉 Vue3 (ref / reactive / toRefs / watch / computed ...)</h3>
    <span>雖然這題目很簡單，但我希望可以從中看到實戰開發的身影。</span>
  </section>
</template>

<style scoped></style>
