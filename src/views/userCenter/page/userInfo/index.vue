<!--
 * @Descripttion: userInfo
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:31:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-06 11:40:46
 -->

<template>
  <div class="userInfo">
    <div class="info">
      <div class="header">
        <div class='head-img'>
          <van-uploader :before-read="before_read"
            :after-read="after_read">
            <div class="head-img">
              <img :src="getUserInfo.personInfo.head_img==='' ? defaultHeader :getUserInfo.personInfo.head_img"
                alt="">

            </div>
          </van-uploader>
          <!-- <img :src="getUserInfo.personInfo.head_img==='' ? defaultHeader :getUserInfo.personInfo.head_img"
            alt=""> -->
        </div>
        <div class="changeHeader">
          <van-uploader :before-read="before_read"
            :after-read="after_read">
            <span>更换头像</span>
            <van-icon name="arrow" />
          </van-uploader>

        </div>

      </div>
      <div class="name"
        @click="showDialog=true">
        <div class="label">
          昵称
        </div>
        <div class="nameText label">
          {{getUserInfo.personInfo.nick_name==='' ?getUserInfo.personInfo.mobile : getUserInfo.personInfo.nick_name}}
        </div>
      </div>

    </div>
    <div @click="$router.push('/addressList')"
      class="address">
      <div class="label">
        地址簿
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-dialog @confirm='confirm'
      @cancel='cancel'
      :before-close='beforeClose'
      className="primaryDialog"
      v-model="showDialog"
      confirm-button-color='#78D0C1'
      title="昵称"
      show-cancel-button>
      <van-field class="userNameInput"
        v-model="userName"
        :maxlength="20"
        name='nick_name'
        placeholder="给自己起个响亮的称呼吧！" />

    </van-dialog>
  </div>
</template>

<script>
import defaultHeader from '@images/default.png'
import { Icon, Uploader, Dialog, Field } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'userInfo',
  components: {
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field
  },
  data() {
    return {
      showDialog: false,
      userName: '',
      defaultHeader
      // userInfo: {
      //   head_img: defaultHeader,
      //   nick_name: '真真棒'
      // }
    }
  },
  methods: {
    // 上传前
    before_read(file) {
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isPNG && !isJPEG && !isJPG) {
        this.$showMsg('上传图片只能是 jpg、png、jpeg格式!')
        return false
      }
      if (!isLt3M) {
        this.$showMsg('上传图片大小不能超过3MB!')
        return false
      }
      return true
    },
    after_read(dataUrl) {
      this.$api['UploadImg']({ data_img: dataUrl.content })
        .then(res => {
          let img_url = res
          this.upload(img_url)
        })
        .catch(err => {})
    },
    // 上传
    upload(img_url) {
      this.$api['UploadHeadImg']({ img_url: img_url })
        .then(res => {
          let userObj = JSON.parse(JSON.stringify(this.getUserInfo))
          userObj.personInfo.head_img = img_url
          this.$store.dispatch('setUserInfo', userObj)
        })
        .catch(err => {})
    },
    beforeClose(action, done) {
      let rules = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/
      if (action === 'confirm') {
        if (this.userName === '' || rules.test(this.userName)) {
          done(false)
        } else {
          done()
        }
      } else {
        done()
      }
    },
    // 修改名称
    confirm() {
      let rules = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/
      if (this.userName === '') {
        this.$showMsg('昵称不能为空！')
      } else if (rules.test(this.userName)) {
        this.$showMsg('昵称不能输入emoji表情！')
      } else {
        this.$api['ModifyNickName']({ nick_name: this.userName })
          .then(res => {
            let userObj = JSON.parse(JSON.stringify(this.getUserInfo))
            userObj.personInfo.nick_name = this.userName
            this.$store.dispatch('setUserInfo', userObj).then(res => {
              this.userName = ''
            })
          })
          .catch(msg => {
            this.$showMsg(msg)
          })
      }
    },
    cancel() {
      this.userName = ''
    }
  },
  created() {},
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>
<style lang="less" >
.userInfo {
  .info {
    color: @fontColorNormal;
    padding: 0 60px;
    background-color: white;
    margin-bottom: 20px;
    font-size: @fontSizehint;
    margin-top: 10px;
    .header {
      .flex();
      height: 160px;
      padding: 0 16px;
      .head-img {
        width: 106px;
        height: 106px;
        border-radius: 50%;
        overflow: hidden;
        .van-uploader {
          .head-img {
            width: 106px;
            height: 106px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .changeHeader {
        span,
        i {
          vertical-align: middle;
        }
        span {
          margin: 0 20px;
        }
      }
    }
    .name {
      .flex();
      height: 99px;
      .border();
      .nameText {
        font-size: @fontSizeArticl;
      }
    }
  }
  .address {
    height: 98px;
    .flex();
    padding: 0 60px;
    background-color: white;
  }
  .label {
    color: @fontColorDark;
  }
}
.userNameInput {
  width: 100%;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 10px;
  font-size: 28px;
  margin-bottom: 50px;
  padding: 19px;
}
</style>


