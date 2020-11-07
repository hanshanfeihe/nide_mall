<template>
  <div id="listpage">
    <!-- 占位 -->
    <div style="height: 1.226667rem;"></div>
    <van-nav-bar
      title="奇趣分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 标签内容 -->
    <van-tabs v-model="tabActive" @click="onClick">
      <van-tab v-for="(item,index) in tabName" :title=tabName[index].name :key="index">
        <div class="categoryDetail">
        <div class="title">{{item.name}}</div>
        <div class="name">{{item.front_name}}</div>
        </div>
        <!-- 商品内容 -->
        <div class="goodslist">
            <van-grid  :column-num="2">
               <van-grid-item v-for="(item,index) in listdata" :key="index" @click="toProduct(item.id)">
                     <van-image :src="item.list_pic_url" width="100%" height="100%" fit="cover"/>
                       <div class="info" style="width: 100%;">
                       <h4>{{item.name}}</h4>
                       <span class="price" style="color:red;">￥{{item.retail_price}}元</span>
                     </div>
                   </van-grid-item>
            </van-grid>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  data () {
    return {
      tabActive: 0,
      listId: 0,
      // 列表数据
      listdata: [],
      // 标签名
      tabName: []
    }
  },
  watch: {
    tabActive: async function () {
      console.log(this.tabActive)
      this.listId = this.tabName[this.tabActive].id
      console.log(this.listId)
      this.getDataList()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 点击标签触发
    onClick (name, title) {
      console.log(title)
      // console.log(name)
    },
    async getDataList () {
      const res = await this.$http.get('goods/list', { params: { categoryId: this.listId, size: 1000, page: 1 } })
      this.listdata = res.data.data.data
    },
    // 跳转到产品页面
    toProduct (id) {
      console.log(id)
      this.$router.push(`/product/${id}`)
    }
  },
  async created () {
    this.listId = this.$route.query.id
    this.getDataList()
    const res2 = await this.$http.get('goods/category', { params: { id: this.listId } })
    this.tabName = res2.data.data.brotherCategory
    const currentName = res2.data.data.currentCategory.name
    this.tabActive = this.tabName.findIndex(item => {
      return item.name === currentName
    })
    console.log(this.tabActive)
    console.log(res2.data)
  }
}
</script>
<style lang="less">
#listpage{
  .van-nav-bar{
    position: fixed;
    width: 100%;
    top: 0;
    left:auto;
    max-width: 20rem;
    z-index: 999;
  }
  .categoryDetail{
    padding: 0.533333rem 0;
    .title{
      font-size: 0.64rem;
      color: #333;
      margin-bottom: 0.4rem;
    }
    .name{
      font-size: 0.586667rem;
      color: #666;
    }
  }
  .van-grid-item{
    width: 50%;
  }
    h4{
          text-overflow: ellipsis;
          width: 100%;
          padding: 0 0.5rem;
          margin-top: 0;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.426667rem;
    }
    .price{
      font-size: 0.48rem;
    }
}
</style>
