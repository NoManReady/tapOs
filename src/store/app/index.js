import * as types from "./constant"
import { loadFromLocal, saveToLocal } from '@/utils/localStorage'
/**
 * 全局布局状态相关
 */
export default {
  namespaced: true,
  state: {
    // 路由title
    title: "",
    // 动画效果
    direction: "forward",
    // 全局loading
    loading: false,
    // 侧边栏是否打开
    collapse: Boolean(loadFromLocal(types.APP_ASIDE_CLOSE)),
  },
  actions: {
    title({ commit }, title) {
      document.title = title
      commit(types.APP_TITLE, title)
    },
    direction({ commit }, direction) {
      commit(types.APP_DIRECTION, direction)
    },
    loading({ commit }, loading = true) {
      commit(types.APP_LOADING, loading)
    },
    setCollapse({ commit }, { value = true, save = true }) {
      save && saveToLocal(types.APP_ASIDE_CLOSE, value);
      commit(types.APP_ASIDE_CLOSE, value);
    }
  },
  mutations: {
    [types.APP_TITLE](state, payload) {
      state.title = payload
    },
    [types.APP_DIRECTION](state, payload) {
      state.direction = payload
    },
    [types.APP_LOADING](state, payload) {
      state.loading = payload
    },
    [types.APP_ASIDE_CLOSE](state, payload) {
      state.collapse = payload;
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    direction(state) {
      return state.direction
    },
    collapse(state) {
      return state.collapse;
    }
  }
}
