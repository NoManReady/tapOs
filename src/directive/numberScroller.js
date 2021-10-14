export default (el, binding) => {
    let _timer = null
    let _nowValue = parseInt(binding.value) || 0
    let _oldValue = parseInt(binding.oldValue) || 0
    let _diff = _nowValue - _oldValue
    let _TIME = 1000
    let _FREQUENCY = 30
    let _type = _diff > 0 ? 1 : _diff < 0 ? -1 : 0
    if (_type === 0) {
      el.innerHTML = _oldValue
      return
    }
    if (_timer) {
      clearInterval(_timer)
    }
    let _val = Math.round(_diff * _FREQUENCY / _TIME)
    _timer = setInterval(() => {
      if (_nowValue != _oldValue) {
        let _nowDiff = _nowValue - _oldValue
        let _left = parseInt(_nowDiff / _val) || 0
        if (_left === 0) {
          _oldValue = _nowValue
        } else {
          _oldValue += _val
        }
        el.innerHTML = _oldValue
      } else {
        clearInterval(_timer)
      }
    }, _FREQUENCY)
  }