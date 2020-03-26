<!--
 * @Descripttion: address
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:31:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-06 11:26:05
 -->

<template>
  <div class="addressList">
    <div v-if="addressList.length>0"
      class="list-box">
      <div class="list">
        <div v-for="(item,index) in addressList"
          :key="index"
          class="list-item">
          <div @click="onEdit(item.receive_address_id)">
            <p class="person">{{item.receiver}}
              <span>{{ item.mobile }}</span>
            </p>
            <p class="addressDetail">{{item.addressDetail}}</p>
          </div>
          <div class="default">
            <van-cell center
              title="设为默认地址">
              <van-switch :value="item.enable"
                activeColor='#65D2C2'
                slot="right-icon"
                :active-value='1'
                :inactive-value='2'
                @input='changeDefault(item.receive_address_id)'
                size='22' />
            </van-cell>
          </div>
        </div>
      </div>
    </div>
    <div v-else
      class="noData-box">
      <noData></noData>
    </div>
    <div class='tc underBtn'>
      <van-button round
        @click="onAdd"
        color='linear-gradient(
        45deg,
        rgba(120, 208, 193, 1) 0%,
        rgba(116, 229, 191, 1) 100%
      )'>
        新增地址
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Cell, Switch, Button } from 'vant'
import noData from '@/components/noData/index.vue'
export default {
  name: 'addressList',
  components: {
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Switch.name]: Switch,
    noData
  },
  data() {
    return {
      isDefault: false,
      addressList: []
    }
  },
  methods: {
    changeDefault(id) {
      this.$api['SetDefaultReceiveAddress']({
        receive_address_id: id
      })
        .then(res => {
          this.getAddressList()
        })
        .catch(err => {})
    },
    onAdd() {
      this.$router.push('/addAddress')
    },
    onEdit(id) {
      this.$router.push(`/editAddress/${id}`)
    },
    // 收货地址
    getAddressList() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        overlay: true,
        className: 'loadingStyle'
      })
      this.$api['GetReceiveAddress']()
        .then(res => {
          Toast.clear()
          res.map((item, index) => {
            let { city, province, area, address } = item
            if (city === area) {
              item.addressDetail = city + province + address
            } else {
              item.addressDetail = city + area + province + address
            }
          })
          this.addressList = res
        })
        .catch(err => {})
    }
  },
  created() {
    this.getAddressList()
  }
}
</script>
<style lang="less">
.addressList {
  .list-box {
    padding: 20px 20px 130px;
    .list {
      .list-item {
        background: #fff;
        border-radius: 10px;
        padding: 0 40px;
        box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.06);
        margin-bottom: 20px;
        .person {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          padding: 40px 0 10px;
          span {
            font-size: 28px;
            color: #666;
            margin-left: 20px;
            font-weight: normal;
          }
        }
        .addressDetail {
          font-size: 28px;
          color: #333;
        }
        .default {
          border-top: 1px solid #efefef;
          margin-top: 30px;
          .van-cell {
            padding: 20px 0;
            .van-cell__title {
              span {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  .underBtn {
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f8f8f8;
    z-index: 10;
    .van-button {
      height: 88px;
      line-height: 88px;
      font-size: 30px;
      width: 588px;
    }
  }
}
</style>


