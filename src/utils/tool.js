/**
 * 获取数据类型
 * @param {any} obj 处理数据
 */
export const getType = obj => {
  let toString = Object.prototype.toString
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}

/**
 * 拷贝数据
 * @param {any} data 数据
 * @param {function} transform 转换函数
 */
export const deepClone = (data, transform = v => v) => {
  let type = getType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    return transform(data)
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 模拟form表单提交
 * @param {表单提交地址} url
 * @param {提交参数} params
 */
export const formSubmit = (url, method = 'post', params) => {
  let _form = document.createElement('form')
  let _iframe = document.createElement('iframe')
  document.body.appendChild(_iframe)
  _iframe.id = 'empty'
  _form.action = url
  _form.method = method
  _form.target = 'empty'
  _form.style.display = 'none'
  for (let key in params) {
    let _input = document.createElement('input')
    _input.name = key
    _input.value = params[key]
    _form.appendChild(_input)
  }
  document.body.appendChild(_form)
  _form.submit()
  setTimeout(() => {
    document.body.removeChild(_form)
    document.body.removeChild(_iframe)
  }, 1000)
  return _form
}

/**
 * 滚动元素至指定位置
 * @param {HTMLElement} el 滚动元素
 * @param {number} from 初始位置
 * @param {number} to 结束位置
 * @param {number} duration 持续时间
 */
export const scrollTop = (el, from = 0, to, duration = 500, cb = () => { }) => {
  return new Promise(r => {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll(start, end, step) {
      cb(start)
      if (start === end) {
        r()
        return
      }

      let d = start + step > end ? end : start + step
      if (start > end) {
        d = start - step < end ? end : start - step
      }

      if (el === window) {
        window.scrollTo(d, d)
      } else {
        el.scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
  })
}

export const loop = () => { }

// 判断对象是否改变
export const objIsSame = (source, target) => {
  let _sourceKeys = Object.keys(source)
  let _targetKeys = Object.keys(target)
  // key值不一致
  if (_sourceKeys.length !== _targetKeys.length) {
    return false
  }
  for (let _key of _sourceKeys) {
    let _ori = source[_key]
    let _cur = target[_key]
    let _oriType = getType(_ori)
    let _curType = getType(_cur)
    // 值类型不一致
    if (_oriType !== _curType) {
      return false
    }
    // 值对象不一致
    if (_oriType === 'array' || _oriType === 'object') {
      if (!objIsSame(_ori, _cur)) {
        return false
      } else {
        continue
      }
    }
    // 值不一致
    if (_ori !== _cur) {
      return false
    }
  }
  return true
}

// 连续点击次数回调
export const registerNclick = (n, dom, cb = () => { }, type = 'click', remove = true) => {
  let _count = 0
  let _prev = 0
  let _handle = (e) => {
    if (!_prev) {
      _prev = e.timeStamp
    }
    if (e.timeStamp - _prev < 300) {
      _count++
    } else {
      _count = 0
    }
    _prev = e.timeStamp
    if (_count === n) {
      cb()
      remove && dom.removeEventListener(type, _handle)
      _count = null
      _prev = null
      _handle = null
    }
  }
  dom.addEventListener(type, _handle, false)
  return () => {
    dom.removeEventListener(type, _handle)
  }
}

// 获取指定父级组件
export const getComponentByName = (parent, name) => {
  if (parent) {
    const _name = parent.$options.name
    if (_name === name) {
      return parent
    }
    return getComponentByName(parent.$parent, name)
  }
  return null
}

// 获取json字符串对象
export const getJsonParseData = (jsonString, def = {}) => {
  try {
    if (jsonString === null) {
      return def
    }
    return JSON.parse(jsonString)
  } catch (error) {
    return def
  }
}
