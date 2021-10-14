import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Loading, Message } from 'element-ui'
import { log, sleep, logout } from '@/utils'
import { accessToken, getCookie } from '@/config'
// 加载最小时间
const MINI_TIME = 300
// 超时时间
let TIME_OUT_MAX = 30000
// 环境value
let _prod = process.env.NODE_ENV === 'production'
// 请求接口host
// let _apiHost = process.env.VUE_APP_PROXY
// 请求组（判断当前请求数）
let _requests = []

let LOADING = null

/**
 * 添加请求，显示loading
 * @param {请求配置} config
 */
function pushRequest(config) {
	log(`${config.url}--begin`)
	_requests.push(config)
	if (!LOADING) {
		LOADING = Loading.service({
			lock: true,
			text: config.text,
			background: 'rgba(255, 255, 255, 0)',
		})
	}
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config
 */
function popRequest(config) {
	log(`${config.url}--end`)
	let _index = _requests.findIndex((r) => {
		return r === config
	})
	if (_index > -1) {
		_requests.splice(_index, 1)
	}
	if (!_requests.length) {
		if (LOADING) {
			LOADING.close()
			LOADING = null
		}
	}
}

// 请求成功无需判断success名单
const reqSuccessPassUrls = []
function isReqSuccessPassUrls(url) {
	return reqSuccessPassUrls.some((path) => url.includes(path))
}

const logoutCode = []
// 无Token请求
const noToken = []
// 全局设置axios
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
// 开发环境使用 /proxy
// axios.defaults.baseURL = _apiHost

// 获取后端接口数据
function getDataOption(obj, key = 'message', def = null) {
	if (obj) {
		return obj[key] || def
	}
	return def
}

/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (params = {}, setting = {}) => {
	if (setting.timeout === 0) {
		setting.timeout = Infinity
	}
	setting = Object.assign(
		{
			isSilence: true,
			timeout: TIME_OUT_MAX,
			showError: true,
			headers: {},
		},
		setting
	)
	let { url, ...options } = params
	// 根据地址设置接口路径

	if (!params.params) {
		params.params = {}
	}
	if (params.method.toLowerCase() === 'get') {
		params.params.t = new Date().getTime()
		params.paramsSerializer = (params) => {
			return qs.stringify(params, { indices: false })
		}
	}

	let _timer = null

	const CancelToken = axios.CancelToken
	const source = CancelToken.source()
	const _promise = new Promise((resolve, reject) => {
		if (accessToken()) {
			setting.headers['access_token'] = accessToken()
		}
		const _instance = axios.create({
			timeout: setting.timeout,
			cancelToken: source.token,
			headers: setting.headers,
		})
		let _random = {
			stamp: new Date().getTime(),
			url: `${url}--${options.method}`,
			text: setting.text,
		}
		if (!setting.isSilence) {
			_timer = setTimeout(() => {
				pushRequest(_random)
			}, MINI_TIME)
		}
		_instance(params)
			.then((res) => {
				const _responseData = res.data || {}
				const _code = _responseData.code
				if (_code === '200' || isReqSuccessPassUrls(res.config.url)) {
					resolve(_responseData.data)
				} else {
					if (logoutCode.includes(_code)) {
						logout()
					} else {
						setting.showError &&
							Message({
								duration: 5000,
								showClose: true,
								type: 'error',
								message: _responseData.message || _responseData.msg,
							})
					}
					reject(_responseData)
				}
			})
			.catch((res) => {
				// 用户取消请求
				res.__isCancel = axios.isCancel(res)
				let _response = res.response
				let _message = ''
				if (!_response) {
					if (!res.__isCancel) {
						if (res.message && res.message.includes('timeout')) {
							_message = '请求超时'
						} else {
							_message = '请求错误'
						}
					}
				} else {
					let _code = _response.status
					switch (_code) {
						case 500:
							_message = getDataOption(_response.data, 'message')
							break
						case 401:
						case 403:
							_message = '认证超时，请重新登录！'
							setTimeout(() => {
								logout()
							}, 500)
							break
						default:
							// _message = JSON.stringify(_response.data, null, 4)
							break
					}
				}
				if (_message && setting.showError) {
					let _options = {
						title: '提示',
						message: _message,
						showClose: true,
						type: 'error',
					}
					Message(_options)
				}
				reject(res)
			})
			.finally(() => {
				// 清除定时器
				clearTimeout(_timer)
				if (!setting.isSilence) {
					popRequest(_random)
				}
			})
	})
	// 取消请求
	_promise.cancel = (fn = null) => {
		return Promise.resolve(typeof fn === 'function' ? fn() : fn).then((d) => {
			return source.cancel(d) || d
		})
	}
	// 超时取消请求
	if (setting.timeoutOk) {
		return Promise.race([_promise, sleep(setting.timeoutOk, null, _promise)])
	}
	return _promise
}
