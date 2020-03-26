<!--
 * @Description: 这里是有tabar的layout
 * @Version: 1.1.0
 * @Autor: ranli
 * @Date: 2020-03-02 09:52:53
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-04 15:36:55
 -->
<template>
  <div class="g-container">
    <cmp-header></cmp-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <cmp-tabbar></cmp-tabbar>
  </div>
</template>

<script>
import cmpHeader from '@cmp/header/index'
import cmpTabbar from '@cmp/tabbar/index'
export default {
  components: {
    cmpHeader,
    cmpTabbar
  },
  name: 'tabbarLaout'
}
</script>