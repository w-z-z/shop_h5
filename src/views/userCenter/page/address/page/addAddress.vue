<!--
 * @Descripttion: addAddress
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-26 19:16:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 15:19:42
 -->
<template>
  <div id="addAddress">
    <div class='address-box'>
      <orderAddress :enable='enable'
        :addressDetail='addressDetail'
        @submitSucc="submitSucc"
        ref="addAddressForm"></orderAddress>
      <div class="isDefault  mt-20">
        <van-cell center
          :title="isDefault.label">
          <van-switch v-bind="{...isDefault}"
            v-model="enable"
            slot="right-icon"
            size='22' />
        </van-cell>

      </div>
    </div>
    <div class="tc"
      style="padding-top: 16px;">
      <van-button class='Button'
        round
        @click="submitForm"
        color='linear-gradient(
        45deg,
        rgba(120, 208, 193, 1) 0%,
        rgba(116, 229, 191, 1) 100%
      )'>
        {{this.$route.name==='addAddress' ? '确定新增' : '保存修改'}}
      </van-button>
    </div>

  </div>
</template>

<script>
import { Button, Cell, Switch } from 'vant'
import orderAddress from '@cmp/orderAddress/index'
// import { mapGetters } from 'vuex'
export default {
  name: 'addAddress',
  components: {
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    orderAddress
  },
  data() {
    return {
      isDefault: {
        label: '设为默认地址',
        type: 'switch',
        activeColor: '#65D2C2',
        activeValue: 1, //默认
        inactiveValue: 2 //非默认
      },
      enable: 2,
      addressDetail: {}
    }
  },
  methods: {
    submitForm() {
      this.$refs.addAddressForm.triggerSubmit()
    },
    submitSucc() {
      this.$showMsg(
        `${this.$route.name === 'addAddress' ? '新增' : '编辑'}地址成功！`
      )
      setTimeout(() => {
        this.$router.push({ name: 'addressList' })
      }, 1000)
    },
    initAddress(id) {
      this.$api['GetReceiveAddressDetail']({
        receive_address_id: this.receive_address_id
      })
        .then(res => {
          let obj = res
          let { city, area, province } = obj
          if (city === area) {
            obj.areaPlace = city + '/' + province
          } else {
            obj.areaPlace = city + '/' + area + '/' + province
          }
          this.addressDetail = obj
          this.enable = obj.enable
        })
        .catch(msg => {})
    },
    // 删除
    deleteAddress() {
      this.$api['DeleteReceiveAddress']({
        receive_address_id: this.receive_address_id
      })
        .then(res => {
          this.$showMsg('删除成功！')
          this.$router.replace({ name: 'addressList' })
        })
        .catch(err => {
          this.$showMsg('删除失败！')
        })
    }
  },
  created() {
    let name = this.$route.name
    if (name === 'editAddress') {
      // 编辑
      let id = this.$route.params.id
      this.receive_address_id = id
      this.initAddress()
      this.$route.meta.headerRight.rightHandel = this.deleteAddress
    }
  }
}
</script>

<style lang="less">
#addAddress {
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: calc(100%-94px);
  display: flex;
  flex-direction: column;
  .address-box {
    flex: 1;
    .isDefault {
      .van-cell {
        padding: 30px;
        border-radius: 10px;
      }
    }
  }
  .Button {
    width: 588px;
    height: 88px;
    line-height: 88px;
    box-shadow: 0px 8px 21px 6px rgba(116, 229, 191, 0.25);
    .van-button__text {
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>


