import { accessToken } from '@/config'
import store from '@/store'
import { log } from '@/utils'
import router from '@/router'
import { getAccessToken } from '@/config'

const Err404 = () => import('@/views/statusPage/404')

function getFirstLeaf(menus) {
	let _leaf = {
		name: 'Err404'
	}
	if (menus.length) {
		let _root = menus[0]
		_leaf = _root.path
		while (_root.children && _root.children.length) {
			_root = _root.children[0]
			_leaf = `${_leaf}/${_root.path}`
		}
	}
	return _leaf
}

// 分模块打包
const getCompDirImport = (dir, path) => {
	let compPromise = null
	switch (dir) {
		case 'overview':
			compPromise = import(/*webpackChunkName: "overview" */ `@/views/overview/${path}.vue`)
			break
		case 'config':
			compPromise = import(/*webpackChunkName: "config" */ `@/views/config/${path}.vue`)
			break
		case 'system':
			compPromise = import(/*webpackChunkName: "system" */ `@/views/system/${path}.vue`)
			break
		case 'diagnose':
			compPromise = import(/*webpackChunkName: "diagnose" */ `@/views/diagnose/${path}.vue`)
			break
		default:
			compPromise = import(/*webpackChunkName: "common" */ `@/views/common/${dir}.vue`)
			break
	}
	return compPromise
}
// 根据菜单回去动态路由
function getDynamicRoutes(menus = [], pMenu = {}) {
	let _routes = []
	menus.forEach((menu) => {
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
					default: () => {
						const paths = menu.compPath.split(/\//g)
						const [type, ...pathRest] = paths
						return getCompDirImport(type, pathRest.join('/'))
					},
				},
				meta: {
					...props,
				},
				props: true,
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
				t: 'notfound',
			},
		},
		{
			path: '*',
			name: 'redirect',
			redirect: () => {
				if (!getAccessToken()) {
					return { name: 'login' }
				}
				log(getFirstLeaf(store.getters.menus))
				return getFirstLeaf(store.getters.menus)
			},
		},
	]
}

export default [
	{
		path: 'login',
		name: 'login',
		component: () => import('@/views/Login')
	}
]
