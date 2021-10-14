import { Loading } from 'element-ui'
import { removeAccessToken } from '@/config'
import router from '@/router'
/**
 * 去中心化
 * @param {上下文} requireContext
 * @param {排除文件} exinclude
 */
export const deCentralization = (requireContext, exinclude = /index/, fn = (argv) => argv) => {
	const sourceMap = {}
	const paths = requireContext.keys().filter((p) => {
		return !exinclude.test(p)
	})
	for (let p of paths) {
		const ss = fn(requireContext(p))
		for (let s in ss) {
			sourceMap[s] = ss[s]
		}
	}
	return sourceMap
}

/**
 * 去中心化(export default形式)
 * @param {上下文} requireContext
 */
export const deCentralizationUmd = (
	requireContext,
	fn = (a, b) => ({
		...a,
		...b,
	})
) => {
	const sourceMap = ((r) => {
		return requireContext.keys().map((k) => {
			return r(k).default
		})
	})(requireContext)
	return sourceMap.reduce(fn)
}

/**
 * 开发输出log
 * @param {消息} msg
 */
export const log = (...msg) => {
	if (process.env.NODE_ENV === 'development' && console && console.log) {
		console.log(...msg)
	}
}

/**
 * 开发输出log
 * @param {消息} msg
 */
export const error = (...msg) => {
	if (
		process.env.NODE_ENV === 'development' &&
		console &&
		console.log &&
		msg[0] !== 'cancel' &&
		msg[0]
	) {
		console.log(
			'%c🥺 GPX-EXPERT:%s',
			'color:rgb(226, 0, 64);font-size:14px;',
			'你有新的订单，请接收！！！'
		)
		console.log(...msg)
		console.log(
			'%c🥳 GPX-EXPERT:%s',
			'color:rgb(61, 188, 55);font-size:14px;',
			'订单接收完毕。'
		)
	}
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr) => {
	let target
	// scrollTop 获取方式不同，不属于style，而且只有document.body才能用
	if (attr === 'scrollTop') {
		target = element.scrollTop
	} else if (element.currentStyle) {
		target = element.currentStyle[attr]
	} else {
		target = document.defaultView.getComputedStyle(element, null)[attr]
	}
	return target
}

// 本地统一loading简单处理
const DEF_LOADING_OPTIONS = {
	lock: true,
	text: 'Loading',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.6)',
	customClass: 'custom-loading',
}
let customLoading = {
	count: 0,
	loading: null,
}
export const openLoading = (options = {}) => {
	customLoading.count++
	if (customLoading.loading) {
		customLoading.loading.close()
	}
	const _options = { ...DEF_LOADING_OPTIONS, ...options }
	customLoading.loading = Loading.service(_options)
	log('add', customLoading.count)
	return () => closeLoading()
}

export const closeLoading = () => {
	customLoading.count--
	log('del', customLoading.count)
	if (customLoading.count <= 0 && customLoading.loading) {
		customLoading.loading.close()
		customLoading.loading = null
	}
}

/**
 * 检测网络是否可用
 */
export const isNetEnable = (host, time = 10000) => {
	var instance = Axios.create()
	instance.defaults.timeout = time
	let _protocol = window.location.protocol
	if (host && host.indexOf(_protocol) !== 0) {
		host = _protocol + '//' + host
	}
	return instance
		.post(`${host || ''}${window.BASE_URI}/api/auth`, {
			method: 'checkNet',
		})
		.then(
			(res) => ({
				code: 1,
				res,
			}),
			(res) => {
				if (res.code === 'ECONNABORTED') {
					return {
						// 超时不通
						code: 0,
						res,
					}
				}
				return {
					// 跨域算通
					code: 1,
					res,
				}
			}
		)
		.catch((res) => {
			return {
				code: 0,
				res,
			}
		})
}

/**
 * 延迟指定时间
 * @param {延迟时间} delay
 */
export const sleep = (delay = 3000, text, p) => {
	let _loading = null
	if (text) {
		_loading = openLoading({ text })
	}
	return new Promise((resolve) => {
		setTimeout(() => {
			_loading && _loading()
			resolve(p && p.cancel())
		}, delay)
	})
}

/**
 * 等待上线
 */
export const awaitOnLine = (time = 5000, text = '请耐心等待...', host, maxTry = 30) => {
	let _loading = null
	if (text !== 0) {
		_loading = Loading.service({
			text,
			background: 'rgba(255, 255, 255, .5)',
		})
	}
	timer.clean()
	return new Promise(async (resolve, reject) => {
		await sleep(time)
		let _res = await isNetEnable(host)
		maxTry--
		while (_res.code === 0 && maxTry) {
			await sleep()
			_res = await isNetEnable(host)
			maxTry--
		}
		_loading && _loading.close()
		if (!maxTry) {
			vueInstance.$msgbox({
				title: '提示',
				message: '网络访问超时，请检查网络是否可连通或尝试刷新页面。',
				type: 'error',
			})
			reject()
		} else {
			resolve()
		}
	})
}

/**
 * 等待上线
 */
export const awaitOnLine_plus = ({ time = 5000, text = '请耐心等待...', host, maxTry = 30 }) => {
	return awaitOnLine(time, text, host, maxTry)
}

export const getBrowserType = () => {
	var u_agent = navigator.userAgent
	var browser_name = 'Failed to identify the browser'
	if (u_agent.indexOf('Firefox') > -1) {
		browser_name = 'Firefox'
	} else if (u_agent.indexOf('Chrome') > -1) {
		browser_name = 'Chrome'
	} else if (u_agent.indexOf('Trident') > -1 && u_agent.indexOf('rv:11') > -1) {
		browser_name = 'IE11'
	} else if (u_agent.indexOf('MSIE') > -1 && u_agent.indexOf('Trident') > -1) {
		browser_name = 'IE(8-10)'
	} else if (u_agent.indexOf('MSIE') > -1) {
		browser_name = 'IE(6-7)'
	} else if (u_agent.indexOf('Opera') > -1) {
		browser_name = 'Opera'
	} else {
		browser_name += ',info:' + u_agent
	}
	return browser_name
}

export const debounce = (func, wait, immediate) => {
	let timeout
	return function (...args) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			timeout = null
			if (!immediate) func.apply(this, args)
		}, wait)
		if (immediate && !timeout) func.apply(this, [...args])
	}
}

export const logout = () => {
	removeAccessToken()
	router.replace({ name: 'Login' })
}

/**
 * 创建一个promise
 */
export const createPromise = () => {
	const _pStatus = {
		resolve: null,
		reject: null,
	}
	const _p = new Promise((resolve, reject) => {
		_pStatus.resolve = resolve
		_pStatus.reject = reject
	})
	return {
		promise: _p,
		..._pStatus,
	}
}
