import * as types from './constant'
import { getUserInfo } from '@/api/modules/system'
export default {
  namespaced: true,
  state: {
    // 平台登录信息
    userInfo: {},
  },
  actions: {
    async getUserInfo({ commit }, argvs) {
      try {
        const _userInfo = await getUserInfo()
        commit(types.USER_INFO, _userInfo)
      } catch (error) {

      }
    }
  },
  mutations: {
    [types.USER_INFO](state, payload) {
      state.userInfo = payload
    }
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    }
  }
}