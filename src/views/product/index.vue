<!--
 * @Descripttion: product
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-03-05 15:43:44
 -->
<template>
  <div v-loading='dataLoading'
    class="product">
    <div v-if="!isFirstLoad&&productData.length==0">
      <noData></noData>
    </div>
    <van-list v-else
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad">
      <div v-for="(item,index) in productData"
        :key="index"
        class="productList">
        <productCard size='middle'
          :showNum='false'
          :showNext="false"
          :showShadow='true'
          :productData="item" />
      </div>
    </van-list>
  </div>
</template>

<script>
import productCard from '@cmp/productCard/index'
import noData from '@cmp/noData/index'
import { List } from 'vant'
export default {
  name: 'product',
  components: {
    productCard,
    noData,
    [List.name]: List,
    [List.name]: List
  },
  data() {
    return {
      finished: false,
      loading: false,
      dataLoading: true,
      productData: [],
      isFirstLoad: true,
      page_no: 1,
      page_size: 10
    }
  },
  methods: {
    onLoad() {
      this.dataLoading = true
      let { page_no, page_size } = this
      this.$api['GetGoodsList']({
        page_no,
        page_size
      })
        .then(res => {
          this.productData.push(...res.data)
          this.loading = false
          this.dataLoading = false
          this.isFirstLoad = false
          this.page_no++
          if (this.productData.length >= res.total) {
            this.finished = true
          }
        })
        .catch(err => {
          this.$showMsg('商品获取失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.product {
  padding: 0 20px;
  min-height: 80vh;
  padding-bottom: 150px;
  .productList {
    margin: 15px 0;
  }
}
</style>


