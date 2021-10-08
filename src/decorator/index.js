import { openLoading } from '@/utils'

/**
 * log装饰器
 * @param {string} desc name
 */
export const _log = function (desc) {
  return function (target, name, descriptor) {
    let fn = descriptor.value
    descriptor.value = function (...args) {
      console.log('欢迎老铁进入', ':', desc, new Date())
      fn.call(this, ...args)
    }
  }
}

/**
 * loading 装饰器
 * @param {*} message 提示信息
 * @param {string} errorFnName 异常处理逻辑
 */
export const loading = function (options, errorFnName) {
  return function (target, name, descriptor) {
    const _fn = descriptor.value
    descriptor.value = async function (...args) {
      const _unloading = openLoading(options)
      try {
        return await _fn.call(this, ...args)
      } catch (error) {
        // 在调用失败，且用户自定义失败的回调函数时，则执行
        if (errorFnName && this[errorFnName] && (this[errorFnName] instanceof Function)) {
          this[errorFnName].call(this, error, ...args)
        }
      } finally {
        _unloading()
      }
    }
  }
}