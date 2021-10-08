
// promise finally polyfill
Promise.prototype.finally = function (cb) {
  return this.then(
    value => {
      Promise.resolve(cb()).then(() => value)
    },
    err => {
      Promise.resolve(cb()).then(() => err)
    }
  )
}