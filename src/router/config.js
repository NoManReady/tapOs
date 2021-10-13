// router进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import menus from './menusConfig'

import { getAccessToken } from '@/config'


// 页面路由对象记录配置（选配）
const HISTORY_CACHE = Object.create(null)
let HISTORY_CACHE_KEY_COUNT = 0
HISTORY_CACHE['/'] = 0

function loadRoutes(router, next, to) {
  return new Promise(async (resolve, reject) => {
    if (!store.getters.dynamicRoutes.length) {
      store.dispatch('setMenus', menus)
      store.dispatch('getDynamicRoute').then(d => {
        router.addRoutes(d)
        router.replace({
          path: to.fullPath
        })
      })
    } else {
      next()
    }
    resolve()
  })
}

export default (router) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !getAccessToken()) {
      next({ name: 'login' })
      return
    }
    NProgress.configure({
      showSpinner: false,
      parent: 'body',
      easing: 'ease',
      speed: 500
    })
    // 设置title，开启加载条
    NProgress.start()
    /*页面级animated--begin*/
    let toName = to.name || to.path
    let fromName = from.name || from.path
    const toIndex = HISTORY_CACHE[toName]
    const fromIndex = HISTORY_CACHE[fromName]
    // 判断当前页面是否进入过
    // 是：如果当前权级>前一个权级，进入（forward），否则退出（reverse）
    // 否：记录当前路径-权级+1，并进入（forward）
    if (toIndex) {
      if (parseInt(toIndex, 10) > parseInt(fromIndex, 10)) {
        store.dispatch('app/direction', 'forward')
      } else {
        store.dispatch('app/direction', 'reverse')
      }
    } else {
      ++HISTORY_CACHE_KEY_COUNT
      toName !== '/' && (HISTORY_CACHE[toName] = HISTORY_CACHE_KEY_COUNT)
      store.dispatch('app/direction', 'forward')
    }
    /*页面级animated--end*/
    loadRoutes(router, next, to)
    // next()

  })

  router.afterEach((to, from) => {
    // 关闭加载条
    NProgress.done()
  })
}