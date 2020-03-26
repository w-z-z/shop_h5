<!--
 * @Descripttion: orders
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-27 10:31:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-13 14:19:21
 -->

<template>
  <div ref="wrapper"
    class="orders">
    <van-tabs animated
      swipeable
      swipe-threshold="100"
      sticky
      v-model="active">
      <van-tab v-for="(nav,navIndex) in navData"
        :key='navIndex'
        :name="nav.status"
        :title="nav.title">
        <van-pull-refresh v-if="nav.status==active"
          v-model="nav.isLoading"
          @refresh="onRefresh(nav.status,navIndex)">
          <div v-if="!nav.isFirstLoad&&nav.data.length<=0">
            <noData></noData>
          </div>
          <van-list v-else
            v-model="nav.loading"
            :finished="nav.finished"
            finished-text=""
            @load="onLoad(nav.status,navIndex)">
            <orderCard v-for="(item,index) in nav.data"
              :key="index"
              :orderInfo='item' />
          </van-list>
        </van-pull-refresh>

      </van-tab>

    </van-tabs>
  </div>
</template>
<script>
import { List, Cell, Tab, Tabs, PullRefresh } from 'vant'
import orderCard from './components/orderCard'
import noData from '@cmp/noData/index'
let $app
export default {
  name: 'orders',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    orderCard,
    noData
  },
  data() {
    return {
      navData: [
        {
          title: '全部',
          loading: false,
          finished: false,
          data: [],
          page_no: 1,
          status: 0,
          page_size: 10,
          isFirstLoad: true,
          isLoading: false,
          scroll: 0
        },
        {
          title: '待付款',
          loading: false,
          finished: false,
          data: [],
          page_no: 1,
          status: 1,
          page_size: 10,
          isFirstLoad: true,
          isLoading: false,
          scroll: 0
        },
        {
          title: '待发货',
          loading: false,
          finished: false,
          data: [],
          page_no: 1,
          status: 3,
          page_size: 10,
          isFirstLoad: true,
          scroll: 0,
          isLoading: false
        },
        {
          title: '已发货',
          loading: false,
          scroll: 0,
          finished: false,
          status: 4,

          data: [],
          page_no: 1,
          page_size: 10,
          isFirstLoad: true,
          isLoading: false
        },
        {
          title: '已完成',
          loading: false,
          scroll: 0,
          finished: false,
          status: 5,

          data: [],
          page_no: 1,
          page_size: 10,
          isFirstLoad: true,
          isLoading: false
        },
        {
          title: '已取消',
          scroll: 0,
          loading: false,
          finished: false,
          data: [],
          status: 2,
          page_no: 1,
          page_size: 10,
          isFirstLoad: true,
          isLoading: false
        }
      ],
      active: 0
    }
  },
  methods: {
    onLoad(key, index) {
      let { page_no, page_size } = this.navData[index]
      this.$api['GetReceiptList']({
        page_no,
        page_size,
        order_status: key
      })
        .then(res => {
          res.data.forEach(item => {
            let productData = {
              product_id: item.product_id,
              product_name: item.product_name,
              price: item.price,
              product_desc: item.product_desc,
              thumbnail: item.thumbnail,
              purchase_num: item.purchase_num
            }
            item['productData'] = productData
          })
          this.navData[index].data.push(...res.data)
          this.navData[index].isFirstLoad = false
          this.navData[index].loading = false
          this.navData[index].page_no++
          this.navData[index].isLoading = false
          if (this.navData[index].data.length >= res.total) {
            this.navData[index].finished = true
          }
        })
        .catch(err => {
          this.$showMsg(err)
        })
    },
    onRefresh(key, index) {
      this.navData[index].isFirstLoad = true
      this.navData[index].finished = false
      this.navData[index].page_no = 1
      this.navData[index].data = []
      this.navData[index].isLoading = true
      this.onLoad(key, index)
    },
    handleScroll() {
      this.navData[this.active].scroll = $app.scrollTop
    }
  },
  mounted() {},
  //添加滚动保存距离
  activated() {
    $app = document.getElementById('app')
    $app.addEventListener('scroll', this.handleScroll)
    $app.scrollTop = this.navData[this.active].scroll
  },
  deactivated() {
    $app.removeEventListener('scroll', this.handleScroll)
  },
  created() {
    this.active = this.$route.params.status ? this.$route.params.status : 0
  }
}
</script>
<style lang="less" scoped>
// .orders {
// margin-top: 90px;
// }
</style>


