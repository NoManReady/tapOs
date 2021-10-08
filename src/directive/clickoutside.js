const clickoutsideContext = '@@clickoutsideContext'

export default {
  /*
   @param el 指令所绑定的元素
   @param binding {Object}
   @param vnode vue编译生成的虚拟节点
   */
  bind(el, binding, vnode) {
    const documentHandler = function (e) {
      if (!vnode.context || el.contains(e.target)) {
        return false;
      }
      if (el[clickoutsideContext].modifiers.special) {
        let _domArray = [...document.getElementsByClassName('el-dialog__wrapper'), ...document.getElementsByClassName('el-message-box__wrapper')]
        if (_domArray.some(item => item.contains(e.target))) {
          return false
        }
      }
      if (binding.expression) {
        vnode.context[el[clickoutsideContext].methodName](e)
      } else {
        el[clickoutsideContext].bindingFn(e)
      }
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value,
      modifiers: binding.modifiers
    }
    setTimeout(() => {
      document.addEventListener('click', documentHandler)
    }, 0)
  },
  update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression
    el[clickoutsideContext].bindingFn = binding.value
    el[clickoutsideContext].modifiers = binding.modifiers
  },
  unbind(el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler)
  }
}