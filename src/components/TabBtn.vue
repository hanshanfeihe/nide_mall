<template>
  <van-tabbar v-model="tabActive">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o" to="/topiclist">专题</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'TabBtn',
  data () {
    return {
      tabActive: 0
    }
  },
  methods: {
  },
  mounted () {
    switch (this.$route.path) {
      case '/category':
        this.tabActive = 2
        break
      case '/':
        this.tabActive = 0
        break
      case '/topiclist':
        this.tabActive = 1
        break
      case '/cart':
        this.tabActive = 3
        break
      case '/mine':
        this.tabActive = 4
        break
      default:
        this.tabActive = 0
    }
  }
}
</script>
<style less="less">
    .van-tabbar{
      height: 1.333333rem;
      max-width: 20rem;
      left: auto;
      margin: 0 auto;
    }
    /* .van-tabbar-item__text {
        font-size: 0.48rem;
      } */

</style>
