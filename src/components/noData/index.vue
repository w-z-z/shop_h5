<!--
 * @Author: your name
 * @Date: 2020-03-04 11:37:02
 * @LastEditTime: 2020-03-05 15:52:00
 * @LastEditors: ranli
 * @Description: In User Settings Edit
 * @FilePath: \online_consent_web\src\components\noData\index.vue
 -->
<template>
  <div class="noData">
    <div class="tc">
      <div class="img-box"><img src="../../assets/img/noData.png"
          alt=""></div>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noData'
}
</script>

<style lang="less">
.noData {
  width: 100%;
  padding: 200px 0;
  position: relative;
  box-sizing: border-box;
  & > div {
    .img-box {
      width: 340px;
      height: 180px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 28px;
      color: #666;
      margin-top: 30px;
    }
  }
}
</style>