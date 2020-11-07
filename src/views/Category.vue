<template>
  <div id="category">
    <!-- 占位 -->
    <div style=" height: 1.44rem;"></div>
    <van-search v-model="searchData" placeholder="请输入搜索关键词" class="search" />
    <van-tree-select
      :items="items"
      height='calc(100vh - 1.44rem)'
      :main-active-index.sync="activeIndex"
      @click-nav="changeRight"
    >
    <template #content>
       <div class='imgbanner' :style="{backgroundImage:'url('+bannerImg+')'}">
        {{bgContent}}
       </div>
       <!-- 分割线 -->
       <van-divider
         :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 0.4rem' }"
       >
         {{name}}分类
       </van-divider>
      <van-grid :column-num="3" icon-size="1.76rem">
        <van-grid-item  v-for="(item,index) in subCategoryList " :key="index" :icon="item.wap_banner_url" :text="item.name" @click="toListPage(item.id)" />
      </van-grid>
      </template>
    </van-tree-select>
    <!-- 占位符 -->
    <div style="height: 1.333333rem;"></div>
    <!-- 底部导航 -->
    <tab-btn></tab-btn>
    </div>
</template>
<script>
import TabBtn from '@/components/TabBtn.vue'
export default {
  name: 'Category',
  data () {
    return {
      categoryList: {},
      searchData: '',
      activeIndex: 0,
      // 右侧item数据
      subCategoryList: [],
      bannerImg: '',
      // 背景内容
      bgContent: '',
      // 分类名称
      name: ''
    }
  },
  components: {
    TabBtn
  },
  computed: {
    items: function () {
      if (typeof this.categoryList.categoryList === 'object') {
        const arr = []
        // console.log(123)
        this.categoryList.categoryList.forEach((item, index) => {
          item.text = item.name
          arr.push(item)
        })
        return arr
      } else {
        return []
      }
    }
  },
  watch: {
    activeIndex: async function () {
      if (this.items.length !== 0) {
        const id = this.items[this.activeIndex].id
        // console.log(id)
        const itemList = await this.$http.get('/catalog/current', { params: { id } })
        this.subCategoryList = itemList.data.data.currentCategory.subCategoryList
        this.bannerImg = itemList.data.data.currentCategory.wap_banner_url
        this.bgContent = itemList.data.data.currentCategory.front_name
        this.name = itemList.data.data.currentCategory.name
        console.log(itemList)
      } else {
        this.subCategoryList = []
      }
    }
  },
  async mounted () {
    const res = await this.$http.get('/catalog/index')
    console.log(res.data)
    this.categoryList = res.data.data
    this.bgContent = this.categoryList.currentCategory.front_desc
    this.bannerImg = this.categoryList.currentCategory.wap_banner_url
    this.subCategoryList = this.categoryList.currentCategory.subCategoryList
  },
  methods: {
    changeRight: function (index) {
      this.activeIndex = index
      console.log(index)
    },
    toListPage: function (id) {
      this.$router.push({ name: 'ListPage', query: { id: id } })
    }
  }
}
</script>
<style lang="less" scoped>
#category{
  .search{
    position: fixed !important;
    display: flex;
    width: 100%;
    top: 0px;
    margin: 0 auto;
    max-width: 20rem;
    z-index: 999;
    background-color: #fff;
  }
  .imgbanner{
    width: 100%;
    height: 2.666667rem;
    line-height: 2.666667rem;
    font-size: 0.4rem;
    color: #fff;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }
}
</style>
