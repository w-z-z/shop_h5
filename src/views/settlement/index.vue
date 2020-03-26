<!--
 * @Descripttion: 结算台
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:42:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-11 09:22:50
 -->
<template>
  <div v-loading='loading'
    class="settlement">
    <div class="productCardBox">
      <productCard :showNum='false'
        :showPurchase='true'
        :showNext="false"
        size='large'
        :productData="proInfo"></productCard>
    </div>
    <div class="chooseNum baseDataFrom">
      <div>
        <div>
          已选 <span v-if="proInfo.limit_2"
            class="hintMsg">(每个ID限购{{proInfo.limit_2}}件)</span>
        </div>
        <div>
          <van-stepper v-model="purchase_num"
            :max="proInfo.limit_2<=0?100000000000:proInfo.limit_2" />
        </div>
      </div>
      <div>
        <div>
          运费
        </div>
        <div>
          到付
        </div>
      </div>
    </div>
    <div class="addressBox">
      <orderAddress :enable='1'
        :openAdd='addressObj.receive_address_id?false:true'
        :addressObj='addressObj'
        @submitSucc="aceptData"
        ref="addAddressForm"></orderAddress>
    </div>
    <div class="payWay baseDataFrom">
      <div>
        <div>
          支付方式
        </div>
        <div class="payWayBox">
          <van-radio-group direction="horizontal"
            v-model="pay_type">
            <van-radio :name="2">
              <img slot="icon"
                slot-scope="props"
                :src="props.checked ? weixinPay : weixinPayno">
            </van-radio>
            <van-radio :name="1">
              <img slot="icon"
                slot-scope="props"
                :src="props.checked ? zhifubaoPay : zhifubaoPayno">
            </van-radio>
          </van-radio-group>
        </div>
      </div>

    </div>
    <div class="proMoney baseDataFrom">
      <div>
        <div>
          产品金额
        </div>
        <div>
          ¥ {{allPrice|money}}
        </div>
      </div>
      <div>
        <div>
          实付款
        </div>
        <div>
          ¥ {{allPrice|money}}
        </div>
      </div>
    </div>
    <!-- 页脚按钮 -->
    <van-submit-bar v-if="!loading"
      ref='vanSubmitBar'
      :price="allPrice*100"
      button-text="结算"
      @submit="onSubmit">
    </van-submit-bar>
  </div>
</template>

<script>
import productCard from '@cmp/productCard/index'
import orderAddress from '@cmp/orderAddress/index'

import { Stepper, SubmitBar, RadioGroup, Radio } from 'vant'
export default {
  name: 'settlement',
  components: {
    productCard,
    orderAddress,
    [SubmitBar.name]: SubmitBar,
    [Stepper.name]: Stepper,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      //产品价格
      //静态图片
      loading: true,
      weixinPay: require('../../assets/img/order/weixinPay.png'),
      weixinPayno: require('../../assets/img/order/weixinPayno.png'),
      zhifubaoPay: require('../../assets/img/order/zhifubaoPay.png'),
      zhifubaoPayno: require('../../assets/img/order/zhifubaoPayno.png'),
      //产品信息
      proInfo: {},
      //地址信息
      addressObj: {},
      //产品数量
      purchase_num: 0,
      //支付方式
      pay_type: 2,
      //已经购买过的数量
      hasNum: 0,
      //支付金额
      pay_amount: 0,
      //只能点击一次
      canClick: true,
      allPrice: 0
    }
  },
  created() {
    this.initData()
  },
  watch: {
    purchase_num(value) {
      let price = this.proInfo.price ? this.proInfo.price : 0
      this.allPrice = value * price
    }
  },
  methods: {
    onSubmit() {
      let restNum = this.proInfo.limit_2 - this.hasNum
      if (this.proInfo.limit_2 > 0 && restNum < this.purchase_num) {
        this.$showMsg(`您还可以再购买${restNum}件此商品`)
        return false
      }
      if (!this.addressObj.receive_address_id) {
        this.$refs.addAddressForm.triggerSubmit()
      } else {
        this.aceptData()
      }
    },
    aceptData(value) {
      let { pay_type, purchase_num } = this
      let { price, product_id } = this.proInfo
      purchase_num = Number(purchase_num)
      if (!this.canClick) {
        return false
      }
      this.$api['Pay']({
        pay_amount: purchase_num * price,
        pay_type,
        product_id,
        purchase_num,
        receive_address_id: value ? value : this.addressObj.receive_address_id
      })
        .then(res => {
          this.canClick = true
          window.location.href = res.pay_url
        })
        .catch(err => {
          this.$showMsg(err)
        })
    },
    getDefaultAdd() {
      new Promise((r, j) => {
        this.$api['GetDefaultReceiveAddress']()
          .then(res => {
            r(res)
            if (res.receive_address_id) {
              this.addressObj = res
            } else {
              this.addressObj = {}
            }
          })
          .catch(err => {
            this.$showMsg('信息获取失败')
            j(err)
          })
      })
    },
    getBuyNum(id) {
      new Promise((r, j) => {
        this.$api['GetPayGoodsNum']({
          product_id: id
        })
          .then(res => {
            this.hasNum = res
            r(res)
          })
          .catch(err => {
            this.$showMsg('信息获取失败')
            j(err)
          })
      })
    },
    getProInfo(id) {
      new Promise((r, j) => {
        this.$api['GetGoodsDetail']({
          product_id: id
        })
          .then(res => {
            this.proInfo = res
            let price = res.price ? res.price : 0
            this.allPrice = this.purchase_num * price
            // console.log(this.proInfo)
            r(res)
          })
          .catch(err => {
            j(err)
            this.$showMsg('信息获取失败')
          })
      })
    },
    initData() {
      let { num, id } = this.$route.params
      this.purchase_num = num
      let p1 = this.getProInfo(id)
      let p2 = this.getBuyNum(id)
      let p3 = this.getDefaultAdd()
      Promise.all([p1, p2, p3]).then(() => {
        this.loading = false
        // 添加不含运费的提示文
        this.$nextTick(() => {
          let _node = document.createElement('div')
          _node.setAttribute('class', 'van-submit-bar_desc')
          _node.innerText = '不含运费，运费到付'
          this.$refs['vanSubmitBar'].childNodes[0].childNodes[0].appendChild(
            _node
          )
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.settlement {
  padding: 20px 24px;
  padding-bottom: 150px;
  .baseDataFrom {
    margin: 20px 0;
    .block(0 31px);
    > div {
      .flex();
      .border();
      color: @fontColorDark;
      height: 88px;
      line-height: 88px;
      font-size: @fontSizeArticl;
    }
    > div:first-child {
      border: none;
    }
  }
  .chooseNum {
    .hintMsg {
      font-size: 22px;
      color: #b4b4b4;
    }
  }
  .payWay {
    padding-top: 5px;
    padding-bottom: 5px;
    .payWayBox {
      flex: 1;
      padding: 0 20px;
    }
  }
  .proMoney {
  }
}
</style>
<style  lang="less"  >
.payWayBox {
  .van-radio--horizontal {
    margin: 0 20px;
    .van-radio__icon {
      height: 68px;
      width: 152px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>


