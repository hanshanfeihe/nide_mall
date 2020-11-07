import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  Button,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Image,
  Panel,
  Card,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  TreeSelect,
  NavBar,
  List,
  Icon,
  Popup,
  Field,
  Form,
  Toast,
  Divider,
  Sku,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Checkbox,
  SubmitBar,
  Empty,
  AddressEdit,
  Area
} from 'vant'
axios.defaults.baseURL = 'http://10.75.27.8:8360/api'
// xios请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象添加Token验证的Authorization字段
  config.headers['x-nideshop-token'] = window.localStorage.getItem('token')
  // console.log(config)cdcd
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)
Vue.use(Panel)
Vue.use(Card)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(TreeSelect)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(List)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Divider)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Sku)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Checkbox)
Vue.use(SubmitBar)
Vue.use(Empty)
Vue.use(AddressEdit)
Vue.use(Area)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
