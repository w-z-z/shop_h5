<!--
 * @Descripttion: tabbar
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-05 12:44:30
 -->
<template>
  <div class="m-tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,key) in nav"
        :key='key'
        :to='item.to'
        :icon="item.icon">{{item.name}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'tabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      nav: {
        product: {
          name: '首页',
          icon: 'home-o',
          to: '/product',
          active: 0
        },
        userCenter: {
          name: '我的',
          icon: 'friends-o',
          to: '/userCenter',
          active: 1
        }
      }
    }
  },
  created() {
    this.active = this.$route.name === 'product' ? 0 : 1
  },
  methods: {},
  watch: {
    active(value) {
      console.log(value)
      // this.active = this.nav[value.name].active
    }
  }
}
</script>

<style lang="less" scoped>
.m-tabbar {
  width: 100%;
}
</style>


