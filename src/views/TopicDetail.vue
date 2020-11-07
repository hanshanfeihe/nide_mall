<template>
  <div id="topicdetail">
    <!-- header部分 -->
    <!-- 占位 -->
    <div style="height: 1.226667rem;"></div>
    <van-nav-bar
      :title="topicInfo.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- content -->
    <div class="content" v-html="topicInfo.content">
    </div>
    <!-- 精选评论 -->
    <van-list
    >
    <van-cell title="精选评论" style="font-weight: bold;">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
         <van-icon name="edit" class="edit-icon" @click="showPopup"/>
        </template>
    </van-cell>
     <van-cell-group v-for="(item,index) in commentList" :key="index">
       <van-cell title="匿名用户" :value="item.add_time" :border="false"/>
       <van-cell :value="item.content" />
     </van-cell-group>
     <van-cell value="查看更多评论>>"  class="moreComment" @click="toMoreComment(topicInfo.id)"/>
    </van-list>
    <!-- 表单展示层 -->
    <van-popup v-model="show">
      <van-field
      v-model="message"
      rows="2"
      autosize
      label="评论"
      type="textarea"
      maxlength="80"
      placeholder="请输入评论"
      show-word-limit
      />
      <div class="btn">
        <van-button type="primary" @click="commitComment">提交</van-button>
        <van-button type="info" @click="nevegative">取消</van-button>
      </div>
      </van-popup>
      <!-- 推荐专题 -->
      <div class="related">
      <van-cell title="--推荐专题--" style="font-size: 0.586667rem;font-weight: bolder;color:#0066CC"/>
      <van-swipe v-for="(item, index) in relatedTopic" :key="index" class="banner">
       <van-swipe-item @click="toTopicDetail(item.id)">
         <img v-lazy="item.scene_pic_url" />
         <div class="info">
           <h4 class="title">{{item.title}}</h4>
         </div>
       </van-swipe-item>
      </van-swipe>
      </div>
  </div>
</template>
<script>
export default {
  name: 'TopicDetail',
  data () {
    return {
      topicId: 0,
      topicInfo: {},
      commentList: [],
      // 控制展示层是否展开
      show: false,
      // 评论内容
      message: '',
      // 推荐专题
      relatedTopic: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/topiclist')
    },
    async getCommentList () {
      this.topicId = this.$route.query.topicId
      console.log(this.topicId)
      const res = await this.$http.get('comment/list/', { params: { valueId: this.$route.query.topicId, typeId: 1, page: 1, size: 5 } })
      this.commentList = res.data.data.data
      // console.log(res)
    },
    // 去看更多评论
    toMoreComment (id) {
      console.log(id)
      this.$router.push({ name: 'allcomments', query: { topicId: id } })
    },
    // 显示展示层
    showPopup () {
      this.show = true
    },
    // 提交评论
    async commitComment () {
      const res = await this.$http.post('comment/post', { content: this.message, typeId: 1, valueId: this.$route.query.topicId })
      console.log(res)
      if (res.status === 200) {
        this.$toast.success('提交评论成功')
        this.getCommentList()
      } else {
        this.$toast.fail('提交失败')
      }
      this.show = false
    },
    // 取消评论
    nevegative () {
      this.message = ''
      this.show = false
    },
    // 获取推荐列表
    async getRelatedTopic () {
      this.topicId = this.$route.query.topicId
      const res = await this.$http.get('/topic/related', { params: { id: this.topicId } })
      if (res.status === 200) {
        // console.log(res.data)
        this.relatedTopic = res.data.data
        // console.log(this.relatedTopic)
      }
    },
    // 跳转id对应专题页
    toTopicDetail (id) {
      this.$router.push({ name: 'topicdetail', query: { topicId: id } })
      // 刷新
      this.$router.go(0)
      // this.$router.push('/home')
    },
    async getTopicInfo () {
      const res = await this.$http.get('topic/detail', { params: { id: this.topicId } })
      console.log(res.data)
      this.topicInfo = res.data.data
    }
  },
  // async mounted () {
  //   this.topicId = this.$route.query.topicId
  //   console.log(this.topicId)
  //   const res = await this.$http.get('topic/detail', { params: { id: this.topicId } })
  //   console.log(res.data)
  //   this.topicInfo = res.data.data
  // },
  created () {
    this.topicId = this.$route.query.topicId
    this.getTopicInfo()
    this.getCommentList()
    this.getRelatedTopic()
  }
}
</script>
<style lang="less">
#topicdetail{
  width: 100%;
  background-color: #fff;
  position: relative;
  .van-nav-bar{
    position: fixed;
    width: 100%;
    top: 0;
    max-width: 20rem;
    font-size: 0.426667rem;
    margin: 0 auto;
    z-index: 999;
  }
  .banner{
    background-color: #fff;
    margin-bottom: 0.533333rem;
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
    .info{
      padding: 0 0.266667rem;
      h4{
        color:#666;
        font-size: 0.426667rem;
        margin: 0.133333rem;
      }
    }
 }
  .content{
    width: 100%;
    img{
      width: 100%;
   }
}
  .van-list .van-cell__title{
    text-align: left;
    font-size: 0.453333rem;
  }
 .van-cell__value--alone{
    color:#969799;
  }
  .edit-icon {
      font-size:0.426667rem;
      line-height: inherit;
    }
  .moreComment{
  .van-cell__value--alone{
      text-align: center;
      font-size: 0.533333rem;
      font-weight: bold;
      color: black;
    }
  }
  .van-popup{
    width: 100%;
    max-width: 20rem;
    .van-field__label{
      width: 2.2em;
    }
  }
  .btn{
    display: flex;
    justify-content: space-around;
    .van-button{
      margin-top: 0.266667rem;
    }
  }
}
</style>
