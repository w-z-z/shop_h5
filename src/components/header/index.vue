<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-06 10:43:37
 -->
<template>
  <div class="m-header">
    <van-nav-bar :title="$route.meta.title"
      :left-arrow='showLeft'
      fixed
      @click-left="onClickLeft"
      @click-right="rightHandel">
      <span v-if="rightContent&&rightContent.type=='icon'"
        slot="right">
        <van-icon v-show="$route.name === 'editAddress'"
          :name="delIcon" />
      </span>
      <span v-if="rightContent&&rightContent.type=='text'"
        slot="right">
        <span v-if='$route.name === "product"'>
          <span v-if="!getToken">
            {{rightContent.text}}
          </span>
          <span v-else>
          </span>
        </span>
        <span v-else>
          {{rightContent.text}}
        </span>
      </span>
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      delIcon: require('../../assets/img/shanchu.png'),
      rightContent: false,
      showLeft: true,
      backURL: ''
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  created() {
    this.initRight()
    this.initLeft()
  },
  methods: {
    initRight() {
      this.$nextTick(() => {
        if (this.$route.meta.headerRight) {
          let { type, text } = this.$route.meta.headerRight
          this.rightContent = {
            type,
            text
          }
        } else {
          this.rightContent = null
        }
      })
    },
    initLeft() {
      if (this.$route.matched[0].name === 'tabbarLayout') {
        this.showLeft = false
      } else {
        this.showLeft = true
      }
      this.backURL = this.$route.meta.backURL ? this.$route.meta.backURL : ''
    },
    onClickLeft() {
      if (this.backURL) {
        this.$router.push(this.backURL)
      } else {
        this.$router.back(-1)
      }
    },
    rightHandel() {
      let headerRight = this.$route.meta.headerRight
      if (headerRight) {
        return headerRight.rightHandel.bind(this)()
      } else {
        return false
      }
    }
  },
  watch: {
    $route() {
      this.initRight()
      this.initLeft()
    }
  }
}
</script>

<style lang="less" >
.m-header {
  width: 100%;
  height: @headerHeight;
  line-height: @headerHeight;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  .van-nav-bar__right {
    font-size: @fontSizehint;
    color: @fontColorNormal;
  }
}
</style>


