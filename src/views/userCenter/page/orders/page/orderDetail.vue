<!--
 * @Descripttion: orderDetail
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:31:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 14:22:00
 -->

<template>
  <div v-loading='loading'
    class="orderDetail">
    <div class="order_header">
      <span :class="['order_status', orderInfo.order_status==1?'danger':'' ]">
        {{orderInfo.order_status|orderStatus}}
      </span>
    </div>
    <div class="orderAddress">
      <orderAddress :addressObj='receive_address' />
    </div>
    <div class="productInfo">
      <productCard numAlign='right'
        :productData='orderInfo.productData'
        :showNext='false' />
      <div class="otherInfo">
        <div>
          <div>产品金额</div>
          <div>¥ {{orderInfo.price}}</div>
        </div>
        <div>
          <div>运费（到付-顺丰） </div>
          <div style="color:#4694F4">¥ 0.00</div>
        </div>
        <div>
          <div>实付款</div>
          <div>¥{{orderInfo.pay_amount}}</div>
        </div>
      </div>
    </div>
    <div class="order_payWay">
      <div>支付方式</div>
      <div class="way">
        <img :src="orderInfo.pay_type==1?payWay1:payWay2"
          alt="zhifubao">
      </div>
    </div>
    <div class="order_numBox">
      <div>
        <div class="label">
          订单编号
        </div>
        <div class="text">
          {{orderInfo.receipt_id}}
        </div>
      </div>
      <div>
        <div class="label">
          下单时间
        </div>
        <div class="text">
          {{orderInfo.create_time|FormatDate('yyyy.MM.dd hh:mm')}}
        </div>
      </div>
      <div v-if="orderInfo.express_no">
        <div class="label">
          快递单号
        </div>
        <div class="text">
          {{orderInfo.express_no}}
        </div>
      </div>
      <div v-if="orderInfo.order_status!=1">
        <div class="label">
          交易时间
        </div>
        <div class="text">
          {{orderInfo.pay_time|FormatDate('yyyy.MM.dd hh:mm')}}
        </div>
      </div>
    </div>
    <van-submit-bar v-if="orderInfo.order_status==1||orderInfo.order_status==4"
      ref='vanSubmitBar'
      :button-text="orderInfo.order_status==1?'去结算':'确认收货'"
      @submit="vanSubmitBar(orderInfo.receipt_id)">
      <div v-if="orderInfo.order_status==1"
        class="cacelButton">
        <van-button round
          @click='cancelOrder(orderInfo.receipt_id)'
          color="#CBCBCB"
          type="info">取消订单</van-button>
      </div>
    </van-submit-bar>
    <van-submit-bar v-if="orderInfo.order_status==3"
      button-type="cancel"
      button-text="取消订单"
      @submit="cancelOrder(orderInfo.receipt_id)">
    </van-submit-bar>
  </div>
</template>

<script>
import { AddressList, SubmitBar, Button } from 'vant'
import orderAddress from '@cmp/orderAddress/index'
import productCard from '@cmp/productCard/index'
import payWay1 from '@images/order/payWay1.png'
import payWay2 from '@images/order/payWay2.png'
import { mapActions } from 'vuex'
export default {
  name: 'orderDetail',
  components: {
    [AddressList.name]: AddressList,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    orderAddress,
    productCard
  },
  data() {
    return {
      payWay1,
      loading: true,
      payWay2,
      orderInfo: {},
      receive_address: {},
      canClick: true
    }
  },
  created() {
    let { id } = this.$route.params
    this.getOrderInfo(id)
  },
  methods: {
    //结算
    ...mapActions(['payOrder']),
    vanSubmitBar(receipt_id) {
      if (this.orderInfo.order_status === 1) {
        if (!this.canClick) {
          return false
        }
        this.payOrder(receipt_id).then(() => {
          this.canClick = false
        })
      } else {
        this.confirmOrder(receipt_id)
      }
    },
    //确认收货
    confirmOrder(id) {
      this.loading = true
      this.$api['ConfirmReceipt']({
        receipt_id: id
      })
        .then(() => {
          this.$showMsg('操作成功')
          setTimeout(() => {
            this.loading = false
            this.$router.go(-1)
          }, 1000)
        })
        .catch(() => {
          this.loading = false
          this.$showMsg('操作失败')
        })
    },
    //取消
    cancelOrder(id) {
      this.loading = true
      this.$api['CancelOrder']({
        receipt_id: id
      })
        .then(() => {
          this.loading = false
          this.$showMsg('操作成功')
          this.$router.replace({
            name: 'orders',
            params: {
              status: 2
            }
          })
        })
        .catch(() => {
          this.loading = false
          this.$showMsg('操作失败')
        })
    },
    //获取订单详情
    getOrderInfo(receipt_id) {
      this.loading = true
      this.$api['GetReceiptDetail']({
        receipt_id
      })
        .then(res => {
          let { receipt, receive_address } = res
          this.receive_address = receive_address
          let productData = {
            product_id: receipt.product_id,
            product_name: receipt.product_name,
            price: receipt.price,
            product_desc: receipt.product_desc,
            thumbnail: receipt.thumbnail,
            purchase_num: receipt.purchase_num
          }
          this.orderInfo = receipt
          this.orderInfo['productData'] = productData
          // console.log(this.orderInfo)
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.orderDetail {
  padding: 0 24px;
  padding-bottom: 200px;
  .order_header {
    height: 71px;
    .flex();
    .order_status {
      font-size: @fontColorNormal;
      color: @textcolor;
      // &.danger {
      //   color: @danger;
      // }
    }
    .order_time {
      color: @textcolor;
      font-size: @fontSizeNormal;
    }
  }
  .orderAddress {
    margin-bottom: 20px;
    .shadow();
  }
  .productInfo {
    margin-bottom: 20px;
    .shadow();
    .block(0);
    .otherInfo {
      .border();
      margin: 20px 24px;
      margin-bottom: 0;
      padding-top: 18px;
      padding-bottom: 18px;
      > div {
        .flex();
        height: 62px;
        font-size: @fontSizehint;
      }
    }
  }
  .order_numBox {
    font-size: @fontSizeNormal;
    font-weight: 400;
    color: @textcolor;
    line-height: 40px;
    .block();
    .shadow();
    > div {
      .flex(felx-start);
      .label {
        width: 120px;
      }
      .text {
        flex: 1;
      }
    }
  }
  .order_payWay {
    .block();
    .shadow();
    .flex(flex-start);
    margin: 20px 0;
    font-size: @fontSizeNormal;
    .way {
      margin-left: 34px;
      img {
        width: 154px;
      }
    }
  }
  .handelOrder {
    height: 140px;
  }
}
</style>


