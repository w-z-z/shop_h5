<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 16:59:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 14:30:56
 -->
<template>
  <div class="login"
    v-loading='dataLoading'>
    <div class="login_background">
      <div>
        <img :src="loginBack"
          alt="">
      </div>
    </div>
    <div class="loginBox">
      <div class="wayOfCode">
        <form class="loginForm">
          <div class="myLoginInput">
            <label><img src="../../assets/img/login/shouji-4.png"
                alt=""></label>
            <van-field v-model="loginForm.mobile"
              type="tel"
              name='mobile'
              maxlength="11"
              clearable
              placeholder="请输入手机号码" />
          </div>
          <div class="myLoginInput code">
            <label><img src="../../assets/img/login/yanzhengma-2.png"
                alt=""></label>
            <van-field v-model="loginForm.code"
              type="tel"
              name='code'
              clearable
              maxlength="6"
              placeholder="请输入短信验证码" />
            <countDown :api="'SendLoginCode'"
              :mobile='loginForm.mobile'
              className="getCode"
              v-model="loginForm.mobile" />
          </div>
          <br>
          <br>
          <br>
          <div @click="submitFrom"
            class="BaseButton">
            登录
          </div>
          <br>
          <div class="agreementButton">
            <van-checkbox v-model="loginForm.checked"
              checked-color="#78D0C1"
              icon-size="16px">我同意并接受
              <span class="agreementPoint"
                @click="$router.push('/TermsService')">
                《服务条款》
              </span>
              和
              <span class="agreementPoint"
                @click="$router.push('/PrivacyStatement')">
                《隐私声明》
              </span>
              等协议</van-checkbox>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { Field, Toast, Checkbox } from 'vant'
import loginBack from '@assets/img/login/logo-down.png'
import countDown from '@cmp/countDown/countDown'
import { phoneValidator, codeValidator } from '@common/validator.js'
export default {
  name: 'login',
  components: {
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    countDown
  },
  data() {
    return {
      loginBack,
      loginForm: {
        code: '',
        mobile: '',
        checked: false
      },
      dataLoading: false
    }
  },
  methods: {
    // //手动提交
    submitFrom() {
      if (this.loginForm.checked) {
        Promise.all([
          phoneValidator(this.loginForm.mobile, 'mobile', ''),
          codeValidator(this.loginForm.code, 'code')
        ])
          .then(res => {
            this.dataLoading = true
            // 发送请求
            this.$api['PersonOpenAccount'](this.loginForm)
              .then(res => {
                let _userInfo = {
                  token: res.token,
                  personInfo: res
                }
                //存储store
                this.$store.dispatch('setUserInfo', _userInfo).then(res => {
                  this.dataLoading = false
                  this.$router.push({ name: 'product' })
                })
              })
              .catch(err => {
                this.dataLoading = false
                this.$showMsg(err)
              })
          })
          .catch(err => {
            this.$showMsg(err.msg)
          })
      } else {
        this.$showMsg('请勾选《服务条款》《隐私声明》')
      }
    }
  }
}
</script>

<style lang='less'  scoped>
.login {
  .login_background {
    height: 300px;
    background: url('../../assets/img/login/bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    width: 100%;
    > div {
      width: 338px;
      height: 142px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .loginBox {
    .loginForm {
      padding: 0 60px;
      .myLoginInput {
        width: 100%;
        height: 100px;
        padding: 10px;
        border-bottom: 2px solid @border;
        &.myLoginInput {
          display: flex;
          align-items: center;
        }
        label {
          width: 28px;
          min-width: 28px;
          height: 32px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .agreementButton {
        .agreementPoint {
          color: @highColor;
        }
      }
    }
  }
}
</style>
<style lang="less" >
.login {
  .myLoginInput {
    .van-cell {
      background-color: transparent;
      &::after {
        display: none;
      }
      .van-field__control {
        line-height: 40px;
        font-size: 30px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px transparent inset;
        }
      }
    }
  }

  .agreementButton {
    .van-checkbox__label {
      font-size: 20px;
      color: @textcolor;
      line-height: 20px;
    }
    .van-checkbox {
      justify-content: center;
    }
  }
}
// toast
.van-toast {
  max-width: 450px;
  border-radius: 20px;
  padding: 30px 60px;
  .van-toast__text {
    font-size: 28px;
    line-height: 50px;
  }
}
</style>

