<template>
  <div id="collect">
    <van-nav-bar
  title="我的收藏"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <van-empty description="暂无收藏" v-if="list.count == 0"/>
    <van-card
   v-for="(item,index) in list.data"
   :key="index"
  :price="item.retail_price"
  :desc="item.goods_brief"
  :title="item.name"
  :thumb="item.list_pic_url"
  @click="toProduct(item.value_id)"
/>
  </div>
</template>
<script>
export default {
  name: 'Collect',
  data () {
    return {
      list: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    toProduct (id) {
      console.log(id)
      this.$router.push(`/product/${id}`)
    }
  },
  async created () {
    const res = await this.$http.get('collect/list', { params: { typeId: 0, size: 1000 } })
    console.log(res.data)
    this.list = res.data.data
    console.log(this.list)
  }
}
</script>
<style lang="less" scope="scoped">
#collect{
 .van-card__thumb{
   width: 2.8rem;
   height: 2.8rem;
 }
 .van-card__content{
   text-align: left;
   font-size: 0.4rem;
   justify-content: center;
   .van-card__bottom{
     .van-card__price{
        font-size: 0.4rem;
        color:red;
     }
   }
}
}
</style>
