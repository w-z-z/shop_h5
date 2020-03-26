<!--
 * @Author: your name
 * @Date: 2020-02-27 18:29:00
 * @LastEditTime: 2020-03-05 10:37:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online_consent_web\src\views\agreement\index.vue
 -->
<template>
  <div class="agreement">
    <div class="agree-content"
      v-html="content"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      content: ''
    }
  },
  methods: {
    getData() {
      let api = this.$route.name
      this.$api[api]()
        .then(res => {
          this.content = res.content
        })
        .catch(msg => {})
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.agreement {
  padding: 20px;
}
</style>


