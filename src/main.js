import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import '@/utils/promise-finally'
import { log, error, openLoading, closeLoading } from '@/utils'

// cookies配置
import cookie from 'cookies-js'
window.Cookie = cookie

// import { i18n } from '@/plugin/i18n'
// Vue.use(i18n)

// UI框架
import '@/utils/elementImport'

// 样式库
import 'element-ui/lib/theme-chalk/display.css';
import '@/style/common.scss'
import '@/style/iconfont/iconfont.css'
import 'animate.css'

import Pager from '@/base/Pager'

Vue.use(Pager)


// 工具配置
import apis from '@/api'
import bus from '@/utils/bus'


import * as filters from '@/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.defineProperties(Vue.prototype, {
  $api: {
    value: apis
  },
  $log: {
    value: log
  },
  $error: {
    value: error
  },
  $bus: {
    value: bus
  },
  $openLoading: {
    value: openLoading
  },
  $closeLoading: {
    value: closeLoading
  }
})

// 环境配置
const dev = process.env.NODE_ENV !== 'production'
Vue.config.debug = dev
Vue.config.devtools = dev
Vue.config.productionTip = !dev


new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app")


