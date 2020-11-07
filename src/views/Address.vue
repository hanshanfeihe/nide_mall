<template>
  <div id="address">
     <van-nav-bar
  title="我的地址"
  left-text="返回"
   right-text="添加新地址"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
<van-empty description="暂无地址"  v-if="addressList.length === 0"/>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data () {
    return {
      addressList: []
    }
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    // 添加新地址
    onClickRight: function () {
      this.$router.push('/address/addAddress')
    },
    getAddressList: async function () {
      const res = await this.$http.get('address/list')
      console.log(res.data)
      this.addressList = res.data.data
    }
  },
  created () {
    this.getAddressList()
  }
}
</script>
<style lang="less" scope="scoped">
</style>
