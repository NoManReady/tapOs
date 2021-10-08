import NotData from './Index.vue'

// 为组件添加 install 方法，用于按需引入
NotData.install = function (vue) {
  vue.component(NotData.name, NotData)
}

export default NotData