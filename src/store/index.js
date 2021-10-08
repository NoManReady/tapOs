import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import system from './system'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    system,
  }
})
