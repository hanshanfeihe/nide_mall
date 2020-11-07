import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartInfo: {
      goodsCount: 0,
      goodsAmount: 0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    },
    // 购物车商品总数
    cartTotal: {
      goodsCount: 0
    },
    // 购物车商品列表
    cartList: []
  },
  mutations: {
    setCartTotal: function (state, cartTotal) {
      state.cartTotal = cartTotal
    },
    setCarList: function (state, cartList) {
      state.cartList = cartList
    },
    setCartInfo: function (state, cartInfo) {
      state.cartInfo = cartInfo
    }
  },
  actions: {
    AjaxCart: async function (content) {
      const cartRes = await axios.get('cart/goodscount')
      console.log(cartRes.data)
      content.commit('setCartTotal', cartRes.data.data.cartTotal)
    },
    getCartList: async function (content) {
      const res = await axios.get('cart/index')
      console.log(res.data)
      content.commit('setCartInfo', res.data.data.cartTotal)
      content.commit('setCarList', res.data.data.cartList)
    }
  },
  modules: {}
})
