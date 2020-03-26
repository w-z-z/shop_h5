<!--
 * @Descripttion: productDetail
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-18 15:30:58
 -->
<template >
  <div v-loading='dataLoading'
    class="productDetail">
    <div class="Myswiper">
      <van-swipe indicator-color='white'
        :autoplay="3000">
        <van-swipe-item v-for="(image, index) in proInfo.Slide"
          :key="index">
          <img v-lazy="image.file_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="notSwiper">
      <div class="introInfo">
        <div class="moneyInfo">
          <span class="unit"> ￥ <span class="price">{{proInfo.price?proInfo.price:0.00|money}}</span> </span>
          <div v-if="proInfo.limit_2"
            class="purchaseLimitation">
            <span class="purchaseLimitationTag">限购</span>
            <span class="hintMsg">
              <van-icon name="warning-o" />
              <span>每个id限购{{proInfo.limit_2}}件</span>
            </span>
          </div>
        </div>
        <div class="productName">
          {{proInfo.product_name}}
        </div>
        <div class="desc">
          {{proInfo.product_desc}}
        </div>
      </div>
      <div class="chooseSku">
        <van-cell @click="show=true"
          title="已选"
          :value="number+'份'"
          is-link />
        <van-cell title="运费"
          is-link
          value="到付" />
        <van-sku v-model="show"
          :sku="sku"
          @stepper-change='stepper'
          :quota='proInfo.limit_2'
          :hide-stock="false"
          @buy-clicked="onBuyClicked">
          <template slot="sku-header">
            <div class="productCardBox">
              <productCard :showNum='false'
                :showPurchase='proInfo.limit_2>0?true:false'
                :showNext="false"
                :showShadow='false'
                size='middle'
                :productData="proInfo"></productCard>
            </div>
          </template>
          <!-- 类型 -->
          <!-- <template slot="sku-messages">
            <div class="typesList">
              <div class="typeName">类型</div>
              <div class="typeText">
                <van-radio-group direction="horizontal"
                  v-model="radio">
                  <van-radio name="1">
                    <div slot="icon"
                      :class="{'active':props.checked}"
                      slot-scope="props"
                      class="typeTextList">
                      类型1
                    </div>
                  </van-radio>
                  <van-radio name="2">
                    <div slot="icon"
                      slot-scope="props"
                      :class="{'active':props.checked}"
                      class="typeTextList">
                      类型2
                    </div>
                  </van-radio>
                </van-radio-group>
              </div>
            </div>
          </template> -->
          <!-- 自定义 sku actions -->
          <template slot="sku-actions"
            slot-scope="props">
            <div class="myActions">
              <span class="sumPrice">
                <span class="sumText">合计：</span>
                <span>{{allPrice/100| money}}</span>
              </span>
              <div class="toBuy"
                @click="props.skuEventBus.$emit('sku:buy')">
                去付款（ {{number}}）
              </div>
            </div>
          </template>
        </van-sku>
      </div>
      <div v-html="proInfo.content"
        class=" richBox proRichText">
      </div>
    </div>

    <!-- 页脚按钮 -->
    <van-submit-bar v-if="!dataLoading"
      :price="allPrice"
      :button-text="'去付款('+number+')'"
      @submit="onBuyClicked">
    </van-submit-bar>
  </div>
</template>

<script>
import {
  Swipe,
  RadioGroup,
  Radio,
  SwipeItem,
  Cell,
  Sku,
  Button,
  Icon,
  SubmitBar
} from 'vant'
import productCard from '@cmp/productCard/index'
export default {
  name: 'productDetail',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Sku.name]: Sku,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    productCard
  },
  data() {
    return {
      allPrice: 0,
      number: 1,
      show: false,
      radio: '1',
      proInfo: {},
      dataLoading: true,
      //商品sku配置
      sku: {
        tree: [],
        list: [],
        stock_num: 10000000000000000,
        none_sku: true // 是否无规格商品
      }
    }
  },
  computed: {},
  methods: {
    onBuyClicked() {
      this.$router.push(
        '/settlement/' + this.number + '/' + this.proInfo.product_id
      )
    },
    stepper(value) {
      this.number = value
      let price = this.proInfo.price ? this.proInfo.price : 0
      this.allPrice = value * price * 100
    },
    //获取商品详情
    getProInfo() {
      this.dataLoading = true
      this.$api['GetGoodsDetail']({
        product_id: this.$route.params.id
      })
        .then(res => {
          this.proInfo = res
          this.allPrice = this.number * res.price * 100
          this.dataLoading = false
        })
        .catch(err => {
          this.$showMsg(err)
        })
    }
  },
  created() {
    this.getProInfo()
  }
}
</script>

<style lang="less" scoped>
.productDetail {
  min-height: 80vh;
  .Myswiper {
    height: 524px;
  }
  .notSwiper {
    position: absolute;
    margin-bottom: 170px;
    width: 100%;
    top: 448px;
    .introInfo {
      background-color: white;
      .block(30px 20px);
      // margin-top: -80px;
      // z-index: 10;
      margin: 24px;
      .moneyInfo {
        .flex();
        .unit {
          color: @danger;
          font-size: @fontSizeArticl;
          .price {
            font-size: 44px;
            color: @danger;
          }
        }
        .purchaseLimitation {
          color: @warning;
          padding: 0 12px;
          flex: 1;
          .flex();
          .hintMsg {
            i,
            span {
              vertical-align: middle;
            }
            i {
              margin-right: 10px;
            }
          }
        }
      }
      .productName {
        font-size: 30px;
        font-weight: 500;
        color: @fontColorDark;
      }
      .desc {
        font-size: @fontSizehint;
        color: @fontColorNormal;
        line-height: 40px;
      }
    }
    .chooseSku {
      margin: 20px;
      .block(0);
      .van-cell {
        height: 89px;
        line-height: 89px;
        font-size: @fontSizeArticl;
        align-items: center;
      }
      .van-cell__right-icon {
        font-size: @fontSizeArticl;
      }
      .productCardBox {
        padding: 20px;
      }
      .typesList {
        font-size: @fontSizehint;
        color: @fontColorDark;
        margin: 10px 20px;
        // .typeName {
        // }
        .typeText {
          margin: 20px 0;
          .typeTextList {
            padding: 6.5px30px;
            background: rgba(244, 244, 244, 1);
            border-radius: 24px;
            font-size: @fontSizehint;
            margin-right: 20px;
            &.active {
              color: @primary;
              border: 1px solid @primary;
              background-color: rgba(36, 185, 162, 0.02);
            }
          }
        }
      }
      .myActions {
        .flex();
        .border();
        padding: 32px;
        .sumPrice {
          color: @danger;
          font-size: 36px;
          .sumText {
            font-size: 26px;
            color: rgba(102, 102, 102, 1);
          }
        }
        .toBuy {
          background: linear-gradient(
            90deg,
            rgba(255, 123, 95, 1),
            rgba(255, 51, 75, 1)
          );
          padding: 21.5px 30px;
          border-radius: 40px;
          color: white;
          font-size: @fontSizeArticl;
        }
      }
    }
    .proRichText {
      background-color: white;
      padding: 20px 0;
      overflow: hidden;
      img {
        width: 100% !important;
      }
    }
  }
}
</style>
<style lang="less" >
.chooseSku {
  .typesList {
    .van-radio__icon {
      height: auto;
      line-height: normal;
      font-size: @fontSizehint;
    }
  }
}
</style>


