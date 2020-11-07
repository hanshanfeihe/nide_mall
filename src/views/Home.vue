<template>
  <div class="home">
    <!-- 占位 -->
    <div style=" height: 1.44rem;"></div>
    <div class="header">
      <a href="/" class="logo"></a>
      <van-search class="search" background="#fff" v-model="value" placeholder="搜索商品,共40436款好物" input-align="center" />
      <van-button plain type="info" size="small" class="login" color="red">登录</van-button>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" width="100%" class="banner">
      <van-swipe-item v-for="(item, index) in bannerImages" :key="index"><img v-lazy="item.image_url" /></van-swipe-item>
    </van-swipe>
    <!-- 商品分类 -->
    <van-grid style="margin:0.266667rem;border-bottom:1px solid #ededed" :column-num="5" icon-size=" 1.333333rem" :border="false">
      <van-grid-item v-for="(item, index) in channel" :icon="item.icon_url" :text="item.name" :key="index" />
    </van-grid>
    <!-- 品牌制造商 -->
     <div class="brandlist">
         <van-cell title="品牌制造商直供"/>
         <van-grid :border="false" :column-num="2">
            <van-grid-item v-for="(item,index) in brandList" :key="index">
               <van-image :src="item.new_pic_url" width="100%" height="100%" fit="cover"/>
                 <div class="info">
                 <h4>{{item.name}}</h4>
                 <span class="price">{{item.floor_price}}元起</span>
               </div>
             </van-grid-item>
         </van-grid>
       </div>
    <!-- 新品上市 -->
    <div class="newlist">
        <van-cell title="--新品上市--" style="font-size: 0.426667rem;"/>
        <van-grid  :column-num="2">
           <van-grid-item v-for="(item,index) in newGoodsList" :key="index">
              <van-image :src="item.list_pic_url" width="100%" height="100%" fit="cover"/>
                <div class="info">
                <h4 style="overflow: hidden;white-space: nowrap;">{{item.name}}</h4>
                <span class="price">{{item.retail_price}}元起</span>
              </div>
            </van-grid-item>
        </van-grid>
      </div>
      <!-- 人气推荐 -->
      <div class="hotlist">
          <van-cell title="--人气推荐--" style="font-size: 0.426667rem;"/>
          <van-card
            v-for="(item,index) in hotGoodsList"
            :key="index"
            :price="item.retail_price"
            :desc="item.goods_brief"
            :title="item.name"
            :thumb="item.list_pic_url"
          />
        </div>
      <!-- 专题精选 -->
      <div class="topiclist">
         <van-cell title="--专题精选--" style="font-size: 0.426667rem;"/>
         <van-swipe :autoplay="3000" width="100%" class="banner" :show-indicators="false">
           <van-swipe-item v-for="(item, index) in topicList" :key="index">
             <img v-lazy="item.scene_pic_url" />
             <div class="info">
               <h4 class="title">{{item.title}} <span class="price">￥{{item.price_info}}元起</span></h4>
               <p class="subtitle">{{item.subtitle}}</p>
             </div>
           </van-swipe-item>
         </van-swipe>
      </div>
      <!-- 居家 -->
    <!--  <div class="homelist">
        <van-cell title="--居家--" style="font-size: 16px;margin-top: 10px;"/>
        <van-grid  :column-num="2">
           <van-grid-item v-for="(item,index) in homeList" :key="index">
              <van-image :src="item.list_pic_url" width="100%" height="100%" fit="cover"/>
                <div class="info">
                <h4 style="overflow: hidden;white-space: nowrap;">{{item.name}}</h4>
                <span class="price">{{item.retail_price}}元起</span>
              </div>
            </van-grid-item>
        </van-grid>
      </div> -->
      <!-- 测试 -->
      <div class="categorylist" v-for="(item,index) in categoryList" :key="index">
        <van-cell :title="item.name" style="font-size: 0.426667rem;margin-top:0.266667rem;"/>
         <van-grid  :column-num="2">
        <van-grid-item v-for="(item2,index) in item.goodsList" :key="index">
              <van-image :src="item2.list_pic_url" width="100%" height="100%" fit="cover"/>
                <div class="info" style="width: 100%;">
                <h4 style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;width:100%;">{{item2.name}}</h4>
                <span class="price">{{item2.retail_price}}元起</span>
              </div>
            </van-grid-item>
        </van-grid>
      </div>
        <!-- 导航栏 -->
        <!-- 导航栏占位符 -->
        <div style="height: 1.333333rem;"></div>
        <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TabBtn from '@/components/TabBtn.vue'
// import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      value: '',
      data: {},
      tabActive: 0
    }
  },
  computed: {
    bannerImages: function () {
      if (typeof this.data.banner === 'object') {
        return this.data.banner
      } else {
        return []
      }
    },
    channel: function () {
      if (typeof this.data.channel === 'object') {
        return this.data.channel
      } else {
        return []
      }
    },
    brandList: function () {
      if (typeof this.data.brandList === 'object') {
        return this.data.brandList
      } else {
        return []
      }
    },
    newGoodsList: function () {
      if (typeof this.data.newGoodsList === 'object') {
        return this.data.newGoodsList
      } else {
        return []
      }
    },
    hotGoodsList: function () {
      if (typeof this.data.hotGoodsList === 'object') {
        return this.data.hotGoodsList
      } else {
        return []
      }
    },
    topicList: function () {
      if (typeof this.data.topicList === 'object') {
        return this.data.topicList
      } else {
        return []
      }
    },
    categoryList: function () {
      if (typeof this.data.categoryList === 'object') {
        return this.data.categoryList
      } else {
        return []
      }
    }
  },
  components: {
    TabBtn
  },
  async mounted () {
    const res = await this.$http.get('/index/index')
    console.log(res.data)
    this.data = res.data.data
  }
}
</script>
<style lang="less" scoped="scoped">
.home {
  position: relative;
  .van-grid-item{
    overflow: hidden;
  }
  h4{
    margin-top: 0;
    margin-bottom: 0;
    font-size: 0.426667rem;
  }
  .price{
    font-size: 0.32rem;
  }
}
.header {
  position: fixed !important;
  display: flex;
  width: 100%;
  top: 0px;
  max-width: 20rem;
  z-index: 999;
  background-color: #fff;
  justify-content: space-around;
  .logo {
    display: inline-block;
    margin-top: 0.266667rem;
    margin-left: 0.266667rem;
    width:1.92rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background-image: url('../assets/images/logo.png');
    background-size: 4.986667rem auto;
    background-position: -1.6rem -3.12rem;
    vertical-align: middle;
  }
  .search {
    width: 65%;
    background-color: #ededed;
  }
  .login {
    margin-top: 0.346667rem;
    margin-right: 0.266667rem;
    width: 15%;
    height: 0.746667rem;
    border-radius: 0.133333rem;
  }
}
.banner{
  width: 100%;
}
.banner img {
  width: 100%;
  height: 5.333333rem;
}
.brandlist{
  .info{
    text-align: left;
    position: absolute;
    left:0.4rem;
    top:0.533333rem;
    h4{
      color:#666;
      font-size: 0.586667rem;
    }
    .price{
      font-size: 0.373333rem;
      color:rgb(127,127,127);
    }
  }
}
.newlist{
  margin-top: 0.266667rem;
}
.hotlist{
  .van-card__content{
    justify-content: center;
    text-align: left;
    .van-card__title{
      font-weight: 900;
      color:#333;
      font-size: 0.426667rem;
    }
    .van-card__bottom{
      .van-card__price{
        color:red;
      }
    }
  }
}
.topiclist{
  background-color: #fff;
  img{
    width: 95%;
  }
  .info{
    padding-left: 0.213333rem;
    text-align: left;
    h4{
      margin: 0;
      font-size: 0.426667rem;
      .price{
        color:red;
      }
  }
  .subtitle{
    margin-top: 0;
    font-size: 0.32rem;
    color:#999;
  }
  }
}
</style>
