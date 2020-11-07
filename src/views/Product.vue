<template>
  <div id="product">
    <!-- 占位 -->
    <div style="height: 1.226667rem;"></div>
    <van-nav-bar
      :title="info.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播图展示 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img_url" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品信息 -->
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>
    <!-- 商品信息 -->
    <div class="params">
      <div class="goodsbrief">
        <p class="name">{{info.name}}</p>
        <p class="brief">{{info.goods_brief}}</p>
        <p class="price">￥{{info.retail_price}}</p>
      </div>
      <!-- 商品规格 -->
      <van-cell title="商品规格" @click="show= true" />
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :initial-sku="initialSku"
        :hide-stock="sku.hide_stock"
        @add-cart="onAddCartClicked"
      >
       <!-- 自定义 sku-header-price -->
        <template #sku-header-price="props">
          <div class="van-sku__goods-price">
            <span style="color:#ccc666">单价：</span>
            <span class="van-sku__price-symbol">￥</span
            ><span class="van-sku__price-num">{{ props.price }}</span>
          </div>
        </template>
      </van-sku>
      <!-- 商品参数 -->
      <div class="goods_params">
        <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >
          商品参数
        </van-divider>
       <van-cell-group>
         <van-cell v-for="(item,index) in attribute" :title="item.name" :value="item.value" :key="index"/>
       </van-cell-group>
       <!-- 图片展示 -->
       <div class="imageInfo" v-html="info.goods_desc">
       </div>
       <van-divider
         :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
       >
         常见问题
       </van-divider>
       <div class="question">
       <van-cell v-for="(item,index) in issue" :title="item.question"  :label="item.answer" :key="index"/>
       </div>
      </div>
    </div>
    <div style="height:1.333333rem"></div>
    <!-- 底部按钮 -->
    <van-goods-action>
      <van-goods-action-icon :icon="icon" text="已收藏" color="#ff5000" @click="collect"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.cartTotal.goodsCount === 0 ? '': $store.state.cartTotal.goodsCount " />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="toBuyList"/>
    </van-goods-action>
  </div>
</template>
<script>
export default {
  name: 'Product',
  props: ['id'],
  data () {
    return {
      productdata: {},
      icon: '',
      hasCollect: '',
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        price: 0, // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        list: []
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: '',
        title: ''
      },
      // 默认选中
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        's-1': 1,
        's-2': 3
      }
    }
  },
  computed: {
    info: function () {
      if (this.productdata.info !== undefined) {
        return this.productdata.info
      } else {
        return {}
      }
    },
    // 轮播图
    images: function () {
      if (this.productdata.gallery !== undefined) {
        return this.productdata.gallery
      } else {
        return []
      }
    },
    attribute: function () {
      if (this.productdata.attribute !== undefined) {
        return this.productdata.attribute
      } else {
        return []
      }
    },
    issue: function () {
      if (this.productdata.issue !== undefined) {
        return this.productdata.issue
      } else {
        return []
      }
    }
  },
  watch: {
    hasCollect: function () {
      this.icon = this.hasCollect ? 'star' : 'star-o'
    }
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    // 跳转订单页面
    toBuyList: function () {
    },
    // 添加到购物车
    addCart: function () {
      this.show = true
    },
    async getCollectState () {
      const res = await this.$http.get('goods/detail', { params: { id: this.id } })
      this.productdata = res.data.data
      this.hasCollect = this.productdata.userHasCollect
    },
    collect: async function () {
      const res = await this.$http.post('/collect/addordelete', { typeId: 0, valueId: this.id })
      console.log(res)
      this.getCollectState()
    },
    onAddCartClicked: async function (skuData) {
      console.log(skuData)
      const chooseIds = skuData.selectedSkuComb['s-1'] + '_' + skuData.selectedSkuComb['s-2']
      console.log(chooseIds)
      const resultPro = this.productdata.productList.filter((item, index) => {
        if (item.goods_specification_ids === chooseIds || chooseIds === '_') {
          return true
        } else {
          return false
        }
      })
      console.log(resultPro)
      const addRes = await this.$http.post('cart/add', { goodsId: resultPro[0].goods_id, number: skuData.selectedNum, productId: resultPro[0].id })
      console.log(addRes)
      if (addRes.status === 200) {
        this.$store.dispatch('AjaxCart')
        this.$toast.success('添加成功')
        this.$store.commit('setCarList', addRes.data.data.cartList)
        this.$store.commit('setCartTotal', addRes.data.data.cartTotal)
      } else {
        this.$toast.failed('添加失败')
      }
      this.show = false
    }
  },
  async created () {
    const res = await this.$http.get('goods/detail', { params: { id: this.id } })
    // const cartRes = await this.$http.get('cart/goodscount')
    // console.log(cartRes)
    this.$store.dispatch('AjaxCart')
    this.productdata = res.data.data
    this.hasCollect = this.productdata.userHasCollect
    this.icon = this.productdata.userHasCollect ? 'star' : 'star-o'
    console.log(this.productdata.userHasCollect)
    console.log(this.isCollect)
    this.goods.picture = res.data.data.info.primary_pic_url
    this.goods.title = res.data.data.info.name
    this.sku.price = res.data.data.info.retail_price
    this.productdata.specificationList.forEach((item, index) => {
      const arr = []
      item.valueList.forEach((item, index) => {
        arr.push({
          id: item.id,
          name: item.value
        })
      })
      this.sku.tree.push({
        k: item.name, // skuKeyName：规格类目名称
        k_s: 's-' + item.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        v: arr
      })
    })
    if (this.productdata.productList) {
      this.productdata.productList.forEach((item, index) => {
        const s1 = item.goods_specification_ids.charAt(0)
        const s2 = item.goods_specification_ids.charAt(2)
        console.log(item.retail_price)
        this.sku.list.push({
          id: item.goods_id, // skuId
          's-1': s1, // 规格类目 k_s 为 s1 的对应规格值 id
          's-2': s2, // 规格类目 k_s 为 s2 的对应规格值 id
          price: item.retail_price * 100, // 价格（单位分）
          stock_num: item.goods_number // 当前 sku 组合对应的库存
        })
      })
    }
    console.log(res.data)
  }
}
</script>
<style lang="less">
#product {
  background-color: #ededed;
  .van-nav-bar{
    position: fixed;
    width: 100%;
    top: 0;
    max-width: 20rem;
    left:auto;
    z-index: 999;
    .van-nav-bar__title{
      font-size: 0.48rem;
      font-weight: 700;
    }
  }
  .van-swipe-item{
    height: 9.333333rem;
    img{
      width: 100%;
      height: 9.333333rem;
    }
  }
  .info{
    background-color: #ccc;
    display: flex;
    justify-content: space-around;
    height: 1.066667rem;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
    span{
      position:relative;
    }
    span::before{
      content: '';
      position:absolute;
      left:-0.8rem;
      top: 0.4rem;
      width:0.266667rem;
      height:0.266667rem;
      background-color: red;
      border-radius: 50%;
    }
  }
  .params{
    .goodsbrief{
      background-color: #fff;
      padding: 1.3rem;
      p{
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
      .name{
        font-size: 0.533333rem;
      }
      .brief{
        color:#444444;
        font-size: 0.48rem;
      }
      .price{
        font-size: 0.426667rem;
        font-weight: 700;
        color:red;
      }
    }
    .goods_params{
      padding: 0.533333rem 0;
      background-color: #fff;
      margin-top: 0.133333rem;
      .van-cell{
        width: 90%;
        margin: 0 auto;
        background-color: #ccc;
        margin-bottom:0.133333rem;
        align-items: center;
        div:nth-child(2){
          text-align: left;
        }
      }
      .imageInfo{
        margin-top: 0.533333rem;
        p{
          margin: 0;
        }
        img{
          width: 100%;
          display: block;
        }
      }
      .question{
        .van-cell{
          text-align: left;
          font-size: 0.48rem;
        }
      }
    }
  }
  .van-goods-action{
      max-width: 20rem;
      margin: 0 auto;
    }
  .van-popup{
    max-width: 20rem;
    left: auto;
    margin: 0 auto;
  }
}
</style>
