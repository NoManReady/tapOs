import Pager from './Index.vue'

// 为组件添加 install 方法，用于按需引入
Pager.install = function (vue) {
  vue.component(Pager.name, Pager)
}

export default Pager