/**
 * 转换流量单位
 * @param {Int} val
 */
 export const rateTrans = val => {
  val = +val
  let _unit = {
    0: '',
    1: 'K',
    2: 'M',
    3: 'G',
    4: 'T'
  }
  let _unitLen = Object.keys(_unit).length - 1
  let _level = 0
  while (val >= 1024 && _level < _unitLen) {
    val /= 1024
    _level++
  }
  return val.toFixed(2) + _unit[_level]
}

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
export const formSubmit = (url, params) => {
  let _form = document.createElement('form')
  let _iframe = document.createElement('iframe')
  document.body.appendChild(_iframe)
  _iframe.id = 'empty'
  _form.action = url
  _form.method = 'post'
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
// 根据连字符获取数组
export const getArrayStr = (str, fn = s => s) => {
  if (!str) {
    return []
  }
  let _strArr = str.split(',')
  let _arr = new Set()
  _strArr.forEach(str => {
    let [b, e = b] = str.split('-')
    if (b > e) {
      [b, e] = [e, b]
    }
    b = +b
    e = +e
    while (b <= e) {
      _arr.add(b.toString())
      b++
    }
  })
  return [..._arr]
}
// 获取vlan字符串
export const getConnectStr = (arr, fn = s => s, split = ',') => {
  let _strArr = []
  if (!(arr instanceof Array)) {
    return arr
  }
  let _arr = [...arr].sort((a, b) => a - b)
  _arr.reduce((prev, next) => {
    let _last = prev[prev.length - 1]
    if (_last && Number(_last[_last.length - 1]) + 1 === Number(next)) {
      _last.push(next)
    } else {
      prev.push([next])
    }
    return prev
  }, _strArr)
  return _strArr
    .reduce((strArr, next) => {
      if (next.length >= 2) {
        strArr.push(`${next[0]}-${next[next.length - 1]}`)
      } else {
        strArr.push(next.join(','))
      }
      return strArr
    }, [])
    .map(fn).join(split)
}

// 合并连续数组
export const mergeArray = (arr, fn = (...argv) => argv) => {
  let _strArr = []
  if (!Array.isArray(arr)) {
    return arr
  }
  let _arr = [...arr].sort((a, b) => a - b)
  _arr.reduce((prev, next) => {
    let _last = prev[prev.length - 1]
    if (_last && Number(_last[1]) + 1 === Number(next)) {
      _last[1] = next
    } else {
      prev.push([next, next])
    }
    return prev
  }, _strArr)
  return _strArr
    .reduce((strArr, next) => {
      strArr.push(fn(...next))
      return strArr
    }, [])
}

/**
 * 生成随机的MAC地址
 * @param {mac前缀} preMac
 */
export const getRandomMac = (preMac = '00:74:9C') => {
  let _i = 6, _mac = ''
  const _chars = '0123456789ABCDEF'
  while (_i--) {
    if (_i % 2) {
      _mac += ':'
    }
    _mac += _chars.charAt(Math.floor(Math.random() * 15))
  }
  return preMac + _mac
}


export const getIntersection = (a, b, fn = a => a) => {
  let _b = b.map(fn)
  return a.filter(x => {
    return _b.indexOf(fn(x)) > -1
  })
}

export const getIntersectionAll = (fn, ...arr) => {
  if (!arr.length) {
    return arr
  }
  return arr.reduce((a, b) => {
    return getIntersection(a, b, fn)
  })
}

// 防抖
export const debounce = (fn, wait = 200) => {
  let _timer = null;
  return function () {
    if (_timer !== null) {
      clearTimeout(_timer)
    }
    _timer = setTimeout(fn, wait)
  }
}

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