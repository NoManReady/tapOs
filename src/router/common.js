import { accessToken } from '@/config'
import store from '@/store'
import { log } from '@/utils'
import router from '@/router'

const Err404 = () =>
  import('@/views//common/404')

// 分模块打包
const getCompDirImport = (dir, path) => {
  const compPromise = null
  switch (dir) {
    case 'overview':
      compPromise = import(/*webpackChunkName: "overview" */ `@/views/overview/${path}.vue`)
      break;
    case 'port':
      compPromise = import(/*webpackChunkName: "port" */ `@/views/port/${path}.vue`)
      break;
    case 'system':
      compPromise = import(/*webpackChunkName: "system" */ `@/views/system/${path}.vue`)
      break;
    case 'defend':
      compPromise = import(/*webpackChunkName: "defend" */ `@/views/defend/${path}.vue`)
      break;
    default:
      break;
  }
  return compPromise
}
// 根据菜单回去动态路由
function getDynamicRoutes(menus = [], pMenu = {}) {
  let _routes = []
  menus.forEach(menu => {
    let { children, ...props } = menu
    if (!menu.compPath) {
      if (menu.children && menu.children.length > 0) {
        _routes.push(...getDynamicRoutes(menu.children, props))
      }
    } else {
      let _curPathString = menu.fullPath.join('/')
      let _route = {
        path: `/${_curPathString}`,
        name: _curPathString,
        components: {
          default:
            () => {
              const paths = menu.compPath.split(/\//g)
              const [type, ...pathRest] = paths
              return getCompDirImport(type, pathRest.join('/'))
            }
        },
        meta: {
          ...props
        },
        props: true
      }
      log(_route.name + '----->' + menu.compPath)
      // 设置路由别名(移除父路径操作)
      // if (pMenu.showChilds === false) {
      //   _route.alias = _route.path.replace(`/${pMenu.path}`, '')
      //   log(_route.path + '-----alias----->' + _route.alias)
      // }
      if (children && children.length) {
        // 路由路径
        let _pathArr = [_curPathString, getFirstLeaf(children)]
        log(_route.name + '------->' + `/${_pathArr.join('/')}`)
        _route.redirect = () => {
          return `/${_pathArr.join('/')}`
        }
        _route.children = getDynamicRoutes(children, props)
      }
      _routes.push(_route)
    }
  })
  return _routes
}

// 获取所有路由
export const getAllRoutes = () => {
  let _dynamicRoutes = getDynamicRoutes(store.getters.menus)
  return [
    ..._dynamicRoutes,
    {
      path: '/404',
      name: 'Err404',
      component: Err404,
      meta: {
        t: 'notfound'
      }
    },
    {
      path: '*',
      name: 'redirect',
      redirect: () => {
        log(getFirstLeaf(store.getters.menus))
        return getFirstLeaf(store.getters.menus)
      }
    }
  ]
}


routes.push(
  {
    path: '*',
    redirect: () => {
      if (accessToken()) {
        return { name: 'Admin' }
      } else {
        return { name: 'Login' }
      }
    }
  }
)
export default routes