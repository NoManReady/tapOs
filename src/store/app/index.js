import * as types from "./constant"
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
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    direction(state) {
      return state.direction
    }
  }
}
