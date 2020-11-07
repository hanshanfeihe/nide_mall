<template>
  <div id="topiclist">
    <van-swipe v-for="(item, index) in topicList" :key="index" class="banner">
     <van-swipe-item @click="toTopicDetail(item.id)">
       <img v-lazy="item.scene_pic_url" />
       <div class="info">
         <h4 class="title">{{item.title}}</h4>
         <p class="subtitle">{{item.subtitle}}</p>
         <p class="price">￥{{item.price_info}}元起</p>
       </div>
     </van-swipe-item>
    </van-swipe>
    <!-- 导航栏占位符 -->
    <div style="height: 1.333333rem;"></div>
    <tab-btn></tab-btn>
  </div>
</template>
<script>
import TabBtn from '@/components/TabBtn.vue'
export default {
  name: 'TopicList',
  data () {
    return {
      topicList: {}
    }
  },
  components: {
    TabBtn
  },
  methods: {
    toTopicDetail: function (id) {
      console.log(123)
      this.$router.push({ name: 'topicdetail', query: { topicId: id } })
    }
  },
  async mounted () {
    const res = await this.$http.get('topic/list')
    console.log(res)
    this.topicList = res.data.data.data
  }
}
</script>
<style lang="less" scoped>
#topiclist{
  .banner{
    background-color: #fff;
    // margin-bottom: 0.533333rem;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
    .info{
      padding: 0 0.266667rem;
      h4{
        color:#666;
        font-size: 0.533333rem;
        margin: 0.133333rem;
      }
      .subtitle{
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        color: #ccc;
      }
      .price{
        color:red;
        font-size: 0.48rem;
      }
      }
  }
}
</style>
