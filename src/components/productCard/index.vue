<!--
 * @Descripttion: productCard
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 15:18:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-18 15:44:24
 -->
 <template>
  <div v-if="productData"
    @click.stop="$router.push('/productDetail/'+productData.product_id)"
    :class="['productCard', {'shadow':showShadow},size]">
    <div class="p_img">
      <img :src="productData.thumbnail"
        alt="p_img">
    </div>
    <div class="OtnerInfo">
      <div class="p_name">{{productData.product_name}}</div>
      <p class="p_desc">{{productData.product_desc}}</p>
      <div class="priceNum"
        :class='numAlign'>
        <span class="price">
          <span class="unit"> ¥ </span>{{productData.price|money}}</span>
        <span v-if="showNum"
          class="num"> x{{productData.purchase_num}}</span>
        <span v-if="showPurchase&&productData.limit_2"
          class="purchaseLimitationTag">限购</span>
      </div>
    </div>
    <div v-if="showNext"
      class="link">
      <img :src="next"
        alt="p_link">
    </div>
  </div>
</template>
 <script>
import next from '@images/next.png'
export default {
  name: 'productCard',
  data() {
    return {
      next
    }
  },
  props: {
    //箭头
    showNext: {
      type: Boolean,
      default: true
    },
    //产品数据
    productData: {
      type: Object,
      default: null
    },
    //阴影
    showShadow: {
      type: Boolean,
      default: false
    },
    //尺寸
    size: {
      type: String,
      default: 'normal'
    },
    //数量
    showNum: {
      type: Boolean,
      default: true
    },
    ///限购
    showPurchase: {
      type: Boolean,
      default: true
    },
    //数量布局
    numAlign: {
      type: String,
      default: 'left'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.productCard {
  .block(20px);
  .flex();
  .p_img {
    width: 160px;
    height: 120px;

    border-radius: @aLLBorderRadius;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 36px;
  }

  .OtnerInfo {
    // line-height: 30px;
    flex: 1;
    .p_name {
      font-size: 30px;
      font-weight: 400;
      color: @fontColorDark;
      .ellipsis(1);
    }
    .p_desc {
      margin: 16px 0;
      color: @textcolor;
      .ellipsis(1);
      font-size: @fontSizeNormal;
    }
    .priceNum {
      .flex(flex-start, center);
      // line-height: 30px;
      .price {
        color: @danger;
        font-size: 40px;
        margin-right: 10px;
        line-height: 28px;
        .unit {
          font-size: @fontSizeArticl;
        }
      }
      &.right {
        .flex(space-between, flex-end);
      }
      .num {
        color: @textcolor;

        font-size: @fontSizehint;
      }
    }
  }
  .link {
    img {
      width: 14px;
    }
  }

  &.large {
    .p_img {
      width: 220px;
      height: 166px;
    }
    .priceNum {
      margin-top: 34px;
    }
  }
  &.middle {
    .p_img {
      width: 160px;
      height: 120px;
    }
    .priceNum {
      margin-top: 20px;
    }
  }
}
</style>