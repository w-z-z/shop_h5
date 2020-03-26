<!--
 * @Descripttion: userCenter
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:31:13
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-06 12:07:13
 -->

<template>
  <div class="userCenter">
    <div @click="$router.push('/userInfo')"
      class="userInfo">
      <div class="header">
        <img :src="getUserInfo.personInfo.head_img === '' ?defaultHeader :getUserInfo.personInfo.head_img"
          alt="header">
      </div>
      <div class="userName">
        {{getUserInfo.personInfo.nick_name==='' ?getUserInfo.personInfo.mobile : getUserInfo.personInfo.nick_name}}
      </div>
      <div class="next">
        <img :src="next"
          alt="next">
      </div>
    </div>
    <div class="orderList">
      <div>
        <div @click="changeRouter(item.status)"
          class="ordeItem"
          v-for="(item,index) in orderList"
          :key='index'>
          <div class="icon">
            <img :src="item.icon"
              alt="">
            <span v-if="item.tage"
              class="numtage ">{{item.tage>='99'?'99+':item.tage}}</span>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import defaultHeader from '@images/default.png'
import userCenterBack from '@images/userCenterBack.png'
import next from '@images/next.png'
import orderMenu from '@images/order/orderMenu.png'
import orderStatus1 from '@images/order/orderStatus1.png'
import orderStatus2 from '@images/order/orderStatus2.png'
import orderStatus3 from '@images/order/orderStatus3.png'
import { mapGetters } from 'vuex'
export default {
  name: 'userCenter',
  data() {
    return {
      defaultHeader,
      next,
      userCenterBack,
      orderList: [
        {
          icon: orderStatus1,
          name: '待付款',
          tage: 0,
          status: 1
        },
        {
          icon: orderStatus2,
          name: '待发货',
          tage: 0,
          status: 3
        },
        {
          icon: orderStatus3,
          name: '已发货',
          tage: 0,
          status: 4
        },
        {
          icon: orderMenu,
          name: '我的订单',
          status: 0
        }
      ]
    }
  },
  methods: {
    changeRouter(s) {
      this.$router.push({
        name: 'orders',
        params: {
          status: s
        }
      })
    },
    getUserOrderNum() {
      this.$api['GetReceiptCount']().then(res => {
        this.orderList[0].tage = res.num_1
        this.orderList[1].tage = res.num_2
        this.orderList[2].tage = res.num_3
      })
    }
  },
  created() {
    this.getUserOrderNum()
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>
<style lang="less" scoped>
.userCenter {
  padding: 0 12px;
  padding-bottom: 150px;
  .userInfo {
    padding: 30px;
    .flex();
    .header {
      height: 132px;
      width: 132px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .userName {
      flex: 1;
      padding: 0 37px;
      font-size: 36px;
      font-weight: 500;
      color: @fontColorDark;
      line-height: 30px;
    }
    .next {
      width: 15px;
      img {
        width: 100%;
      }
    }
  }
  .orderList {
    height: 187px;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    background-image: url('../../assets/img/userCenterBack.png');
    background-size: 100% 100%;
    > div {
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      .flex();
      .ordeItem {
        flex-grow: 1;
        text-align: center;
        .icon {
          position: relative;
          width: 64px;
          height: 64px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
          .numtage {
            position: absolute;
            top: 12px;
            right: 0px;
            background-color: #fe393c;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            font-size: 15px;
            color: white;
            .flex(center, center);
          }
        }
        p {
          font-size: 24px;
          margin-top: 23px;
          font-weight: 400;
          color: @fontColorDark;
        }
      }
    }
  }
}
</style>


