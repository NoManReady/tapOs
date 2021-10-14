import * as types from './constant'
import {
  getAllRoutes
} from '@/router/common'
import {
  getQuene
} from '@/utils/menuConfig'
/**
 * 菜单状态相关
 */
export default {
  state: {
    // 菜单
    menus: [],
    // 动态路由
    dynamicRoutes: [],
  },
  actions: {
    setMenus({
      commit
    }, menus) {
      commit(types.APP_MENUS, getQuene(menus))
    },
    getDynamicRoute({
      commit,
      getters
    }) {
      return new Promise((resolve, reject) => {
        const _routes = getAllRoutes()
        commit(types.APP_ROUTES, _routes)
        resolve(_routes)
      })
    },
  },
  mutations: {
    [types.APP_MENUS](state, payload) {
      state.menus = Object.freeze(payload)
    },
    [types.APP_ROUTES](state, payload) {
      state.dynamicRoutes = Object.freeze(payload)
    },
  },
  getters: {
    dynamicRoutes(state) {
      return state.dynamicRoutes
    },
    menus(state) {
      return state.menus
    },
    childMenus(state) {
      return state.childMenus
    },
    adminMenus(state) {
      let _adminMenu = state.menus.find(menu => menu.path === 'admin')
      return _adminMenu ? _adminMenu.children : []
    },
  }
}
