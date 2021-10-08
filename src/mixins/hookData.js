/**
 * 简单事件（promise）
 */

const listenersMap = new Map()

export const addListener = (name, cb, vm) => {
  const _listeners = listenersMap.get(name) || []
  const _promiseCallback = (...argv) => Promise.resolve(cb(...argv))
  _listeners.push({ cb, name, _promiseWrap: _promiseCallback })
  listenersMap.set(name, _listeners)
  const _unListener = () => removeListener(name, cb)
  if (vm) {
    vm.$on('hook:beforeDestroy', _unListener)
  }
  return _unListener
}

export const removeListener = (name, cb) => {
  if (!cb) {
    listenersMap.set(name, null)
  } else {
    const _listeners = listenersMap.get(name) || []
    const _removeIndex = _listeners.findIndex(listen => listen.cb === cb && listen.name === name)
    if (_removeIndex > -1) {
      _listeners.splice(_removeIndex, 1)
    }
  }
}

export const notifyListener = (name, options) => {
  const _listeners = listenersMap.get(name) || []
  return _listeners.map(listen => listen._promiseWrap(options))
}