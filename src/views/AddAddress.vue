<template>
  <div id="addAddress">
    <van-nav-bar
  title="新建地址"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<van-address-edit
  :area-list="areaList"
  show-set-default
  show-search-result
  :tel-validator="mobileRules"
  @save="onSave"
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
/>
  </div>
</template>
<script>
import areaList from '../assets/js/areaList.js'
export default {
  name: 'AddAddress',
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    onSave: async function (val) {
      console.log(val)
      const res = await this.$http.post('address/save', { address: val.addressDetail, city_id: 37, province_id: 2, district_id: 403, name: val.name, mobile: val.tel, is_default: val.isDefault })
      console.log(res.data)
    },
    // 手机号码校验规则
    mobileRules: function (val) {
      return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(val)
    }
  }
}
</script>
<style lang="less" scope="scoped">
</style>
