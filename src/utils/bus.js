import Vue from 'vue'
const bus = new Vue({})
let _on = bus.$on
let _emit = bus.$emit
let _off = bus.$off
bus.$on = (name, fn) => {
    if (bus._events[name]) {
        bus.$off(name)
    }
    _on.call(bus, name, fn)
}
bus.$has = (name) => {
    return name && bus._events[name]
}
bus.$off = (name) => {
    if (name && bus._events[name]) {
        _off.call(bus, name)
    }
}
bus.$emit = (name, params) => {
    if (!params || !params.from) {
        console.warn && console.warn('The paramter(from) is null')
    }
    if (!bus._events[name]) {
        console.warn && console.warn(`${name}未注册`)
        return
    }
    _emit.call(bus, name, params)
}
export default bus