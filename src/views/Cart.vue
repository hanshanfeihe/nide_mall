<template>
  <div id="Cart">
    <!-- 商品信息 -->
    <div style="height:1.066667rem"></div>
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 购物车列表 -->
    <div class="list">
      <!-- <div v-for="(item,index) in $store.state.cartList" :key="index">1</div> -->
      <div class="goods" v-for="(item,index) in cartList" :key="index">
        <van-checkbox v-model="item.checked" icon-size="0.6rem" @click="changeSelect(item)"></van-checkbox>
        <van-image width="2.5rem" height="2.5rem" :src="item.list_pic_url" fit='cover'/>
        <div class="goodsInfo">
          <div class="brief">{{item.goods_name}}</div>
          <div class="specifition">{{item.goods_specifition_name_value}}</div>
          <div class="price">￥{{item.market_price}}</div>
          <span class="number">x{{item.number}}</span>
        </div>
      </div>
    </div>
    <!-- 提交订单栏 -->
    <div style="height:50px"></div>
    <van-submit-bar :price="cartInfo.checkedGoodsAmount * 100" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checkedAll" icon-size="0.6rem" @click="toggleSelect">已选{{cartInfo.checkedGoodsCount}}</van-checkbox>
    </van-submit-bar>
    <div style="height:1.333333rem"></div>
    <tab-btn></tab-btn>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import TabBtn from '@/components/TabBtn.vue'
// const mapStateObj = mapState(['cartTotal', 'cartList'])
export default {
  name: 'Cart',
  data () {
    return {
      checkedAll: ''
      // 商品价格
    }
  },
  components: {
    TabBtn
  },
  computed: {
    ...mapState(['cartTotal', 'cartList', 'cartInfo'])
  },
  // checkedAll: {
  //   get () {
  //     if (this.cartInfo.checkedGoodsCount === this.cartInfo.goodsCount) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   },
  //   set (val) {
  //     console.log('设置全选', val)
  //     // const ids = []
  //     this.cartList.forEach(item => {
  //       item.checked = val
  //       // ids.push(item.id)
  //       // this.changeSelect(item)
  //     })
  //     console.log(this.cartList)
  //     console.log(this.cartInfo)
  //     // console.log(ids)
  //     // const id = ids.join(',')
  //     // console.log(id)
  //     // const res = await this.$http.post('/cart/checked', { isChecked: Number(0), productIds: id })
  //     // console.log(res)
  //     // this.$store.commit('setCarList', res.data.data.cartList)
  //     // this.$store.commit('setCartInfo', res.data.data.cartTotal)
  //     // this.$forceUpdate()
  //   }
  // }
  watch: {
  },
  methods: {
    onSubmit () {
      this.$toast.success('暂未实现该功能')
    },
    async changeSelect (item) {
      // console.log(item.checked)
      // console.log(Number(item.checked))
      const res = await this.$http.post('/cart/checked', { isChecked: Number(item.checked), productIds: item.product_id })
      // console.log(res.data)
      // this.getCount()
      this.$store.commit('setCarList', res.data.data.cartList)
      this.$store.commit('setCartInfo', res.data.data.cartTotal)
      this.$forceUpdate()
      if (this.cartInfo.goodsCount === this.cartInfo.checkedGoodsCount) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
    },
    async toggleSelect () {
      const ids = []
      this.cartList.forEach(item => {
        item.checked = Number(this.checkedAll)
        ids.push(item.product_id)
      })
      // this.$store.commit('setCarList', this.cartList)
      // this.$forceUpdate()
      const id = ids.join(',')
      const res = await this.$http.post('/cart/checked', { isChecked: Number(this.checkedAll), productIds: id })
      // // this.$store.commit('setCartInfo', this.cartTotal)
      console.log(res.data)
      this.$store.commit('setCarList', res.data.data.cartList)
      this.$store.commit('setCartInfo', res.data.data.cartTotal)
      this.$forceUpdate()
    }
    // async getCount () {
    //   const res = await this.$http.get('cart/index')
    //   // console.log(res.data)
    //   this.cartList2 = res.data.data.cartTotal
    // }
  },
  async created () {
    this.$store.dispatch('getCartList')
    const res = await this.$http.get('cart/index')
    if (res.data.data.cartTotal.goodsCount === res.data.data.cartTotal.checkedGoodsCount) {
      this.checkedAll = true
    } else {
      this.checkedAll = false
    }
    // console.log(this.$store.state.cartList)
    // console.log(this.$store.state.cartInfo.goodsCount)
  }
}
</script>
<style lang="less">
#Cart {
  width: 100%;
  // position: relative;
  .info {
    position: fixed;
    display: flex;
    top:0;
    // left:0;
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
    justify-content: space-around;
    background-color: #ccc;
    align-items: center;
    height: 1.066667rem;
    line-height: 1.066667rem;
    font-size: 0.32rem;
    z-index: 999;
    span {
      position: relative;
    }
    span::before {
      content: "";
      position: absolute;
      left: -0.2rem;
      top: 0.47rem;
      width: 0.1rem;
      height: 0.1rem;
      background-color: red;
      border-radius: 50%;
    }
  }
  .list{
    background-color: #fff;
    .goods{
    display: flex;
    position: relative;
    box-sizing: border-box;
    font-size: 0.373333rem;
    font-weight: 400;
    padding: 0.266667rem 0rem;
    // justify-content:space-evenly;
    // background-color: #fff;
    border-bottom: 1px solid #ccc;
    .van-checkbox{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0.133333rem;
    }
    .van-image{
      vertical-align:center;
      background: #efefef;
    }
    .goodsInfo{
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: space-between;
      margin: 0 0.133333rem;
      align-items: flex-start;
      .price{
        color:red;
      }
      .number{
        position: absolute;
        top:0.133333rem;
        right:0.133333rem;
        font-size: 0.373333rem;
      }
    }
  }
  }
  .van-submit-bar{
      bottom:1.333333rem;
      max-width: 20rem;
      margin: 0 auto;
      left: auto;
      height: 1.333333rem;
      .van-checkbox {
        font-size: 0.426667rem;
      }
    }
}
</style>
