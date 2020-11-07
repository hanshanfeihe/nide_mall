<template>
  <div id="mine">
    <!-- 用户信息 -->
    <div class="head">
      <div class="user-image">
        <img src="../assets/images/user.png" alt="">
      </div>
      <div class="user-info">
        <div class="phone">{{phone}}</div>
        <div class="identify">普通用户</div>
      </div>
    </div>
    <!-- 用户权限 -->
    <div class="userpower">
      <van-grid :column-num="3" icon-size="1rem">
          <van-grid-item v-for="(item,index) in userPower" :key="index" :icon="item.icon" :text="item.name"  @click="toPage(item.link)"/>
       </van-grid>
    </div>
    <!-- 导航栏占位符 -->
    <div style="height: 1.333333rem;"></div>
    <tab-btn></tab-btn>
  </div>
</template>
<script>
import TabBtn from '@/components/TabBtn.vue'
export default {
  name: 'Mine',
  phone: '',
  data () {
    return {
      test: '测试',
      userPower: [{
        name: '我的收藏',
        icon: 'goods-collect-o',
        link: 'collect'
      },
      {
        name: '地址管理',
        icon: 'location-o',
        link: 'address'
      },
      {
        name: '我的订单',
        icon: 'orders-o',
        link: ''
      },
      {
        name: '周末拼单',
        icon: 'calendar-o',
        link: ''
      },
      {
        name: '优惠劵',
        icon: 'gold-coin-o',
        link: ''
      },
      {
        name: '优选购',
        icon: 'discount',
        link: ''
      },
      {
        name: '我的红包',
        icon: 'balance-o',
        link: ''
      },
      {
        name: '会员plus',
        icon: 'vip-card-o',
        link: ''
      },
      {
        name: '邀请返利',
        icon: 'refund-o',
        link: ''
      },
      {
        name: '意见反馈',
        icon: 'edit',
        link: ''
      },
      {
        name: '客服咨询',
        icon: 'service-o',
        link: ''
      },
      {
        name: '账户安全',
        icon: 'certificate',
        link: ''
      }
      ]
    }
  },
  components: {
    TabBtn
  },
  created () {
    this.phone = window.localStorage.getItem('nideShopUser')
  },
  methods: {
    toPage (link) {
      if (link !== '') {
        this.$router.push('/' + link)
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less">
#mine{
  .head{
    display:flex;
    padding-left:0.4rem;
    padding-top: 0.4rem;
    height: 4rem;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    background-color: chocolate;
    .user-image{
      width: 2.133333rem;
      height:2.133333rem;
      margin: 0.266667rem;
      // border-radius:50%;
      // background-color: red;
      img{
        width:100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .user-info{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      text-align: left;
      font-size: 0.373333rem;
      font-weight: 400;
      color:#fff;
      .phone{
        margin-bottom: 0.213333rem;
      }
    }
  }
  .van-grid-item__content{
    height: 3.333333rem;
  }
  .van-grid-item__content::after{
    border-color: darkgray;
  }
  .van-grid:nth-child(1)::after {
    border-left: 1px darkgray solid;
  }
}
</style>
