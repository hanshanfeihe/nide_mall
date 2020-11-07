<template>
<div id="allcomments">
  <van-nav-bar
    title="查看更多评论"
    left-text="返回"
    @click-left="onClickLeft"
  />
  <van-list
  >
   <van-cell-group v-for="(item,index) in allComments" :key="index">
     <van-cell title="匿名用户" :value="item.add_time" :border="false"/>
     <van-cell :value="item.content" />
   </van-cell-group>
  </van-list>
</div>
</template>

<script>
export default {
  name: 'AllComments',
  data () {
    return {
      topicId: 0,
      allComments: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async getAllComments () {
      this.topicId = this.$route.query.topicId
      const res = await this.$http.get('comment/list', { params: { valueId: this.topicId, typeId: 1, size: 100, page: 1 } })
      console.log(res.data)
      this.allComments = res.data.data.data
    }
  },
  created () {
    this.getAllComments()
  }
}
</script>

<style lang="less">
#allcomments{
  .van-cell__title{
    text-align: left;
    font-size: 17px;
  }
  .van-cell__value--alone{
     color:#969799;
   }
}
</style>
