<!--
 * @Descripttion: orderCard
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 13:50:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 16:34:25
 -->


<template>
  <div @click.stop="toDetail(orderInfo.receipt_id)"
    class="orderCard">
    <div class="O_header">
      <span>{{orderInfo.create_time|FormatDate}}</span>
      <span :class="['status',{'danger':orderInfo.order_status==1}]">{{orderInfo.order_status|orderStatus}}</span>
    </div>
    <div class="O_content">
      <productCard :showShadow='true'
        :productData='orderInfo.productData'
        :showNext='true' />
    </div>
    <div class="O_footer">
      <div>
        <span>实付款：</span><span class="price">￥{{orderInfo.pay_amount|money}}</span>
      </div>
      <div class="handel">
        <div class="settlement"
          @click.stop.once="payOrder(orderInfo.receipt_id)"
          v-if="orderInfo.order_status==1">
          去结算
        </div>
        <div @click.stop="confirmOrder(orderInfo.receipt_id)"
          class="confirm"
          v-if="orderInfo.order_status==4">
          确认收货
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, Button } from 'vant'
import productCard from '@cmp/productCard/index'
import { mapActions } from 'vuex'
mapActions
export default {
  name: 'orderCard',
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    productCard
  },
  props: {
    orderInfo: {
      type: [Number, Object],
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['payOrder']),
    //确认收货
    confirmOrder(id) {
      this.$api['ConfirmReceipt']({
        receipt_id: id
      })
        .then(() => {
          this.$router.go(0)
          this.$showMsg('操作成功')
        })
        .catch(() => {
          this.$showMsg('操作失败')
        })
    },
    toDetail(id) {
      this.$emit('afterClick')
      this.$router.push('/orderDetail/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.orderCard {
  background: white;
  margin: 20px 0;
  border-radius: 20px;
  padding: 0 32px;
  .O_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
  }
  .O_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 90px;
    padding: 30px 0;
    color: @textcolor;
    font-size: @fontSizeArticl;
    .price {
      color: @fontColorDark;
      font-size: 30px;
    }
    .handel {
      .settlement {
        padding: 12.5px 21px;
        color: white;
        border-radius: 80px;
        background-color: #ff5357;
      }
      .confirm {
        padding: 12.5px 35px;
        border-radius: 80px;
        color: #ff5357;
        border: 1px solid #ff5357;
      }
    }
  }
}
</style>


