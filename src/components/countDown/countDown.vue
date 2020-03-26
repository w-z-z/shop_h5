<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-01-14 10:49:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-06 09:52:39
 -->
<template>
  <div :class="[className,]">
    <a v-show="timeShow"
      @click="sendcode">获取验证码</a>
    <a v-show="!timeShow">{{ time }} 秒</a>
  </div>
</template>

<script>
import { phoneValidator } from '@common/validator.js'
import { Toast } from 'vant'
export default {
  name: 'countDown',
  props: {
    className: {
      type: String
    },
    //值的合集
    mobile: {
      type: [String, Number, Array],
      default: () => {
        return {}
      }
    },
    api: {
      type: String
    }
  },
  model: {
    prop: 'mobile',
    event: 'sendCode'
  },
  data() {
    return {
      timeShow: true,
      time: '',
      timer: null
    }
  },
  methods: {
    sendcode() {
      phoneValidator(this.mobile, 'mobile')
        .then(res => {
          let params = {
            mobile: this.mobile
          }
          let api = this.api
          this.$api[api](params)
            .then(res => {
              const TIME = 59
              if (!this.timer) {
                this.time = TIME
                this.timeShow = false
                this.timer = setInterval(() => {
                  if (this.time > 0 && this.time <= TIME) {
                    this.time--
                  } else {
                    this.timeShow = true
                    clearInterval(this.timer)
                    this.timer = null
                  }
                }, 1000)
              }
            })
            .catch(msg => {
              this.$showMsg(msg)
            })
        })
        .catch(error => {
          Toast(error.msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.getCode {
  width: 168px;
  min-width: 189px;
  height: 60px;
  border: 1px solid #4c9bdf;
  border-radius: 30px;
  line-height: 60px;
  text-align: center;
  a {
    color: #4c9bdf;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
  }
}
</style>