
<!--
 * @Description: dialog
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-14 10:49:46
 * @LastEditors: ranli
 * @LastEditTime: 2020-02-28 18:02:12
 -->
<template>
  <div class="mydialog">
    <van-dialog v-model="showDialog"
                title="昵称">
      <slot></slot>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: "mydialog",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  // props: {
  //   className: {
  //     type: String
  //   },
  //   //值的合集
  //   phone: {
  //     type: [String, Number, Array],
  //     default: () => {
  //       return {};
  //     }
  //   }
  // },
  // model: {
  //   prop: "phone",
  //   event: "sendCode"
  // },
  data () {
    return {
      showDialog: true,
    };
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
</style>