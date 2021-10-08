import cookie from 'cookies-js'
const domain = `${document.domain}`
export const isProd = process.env.NODE_ENV === 'production'

export const getCookie = (name) => cookie.get(name, { domain })
export const setCookie = (name, value) => cookie.set(name, value, { domain })
export const removeCookie = (name) => cookie.expire(name, { domain })

// access_token
export const setAccessToken = (token) => setCookie('access_token', token)
export const accessToken = () => getCookie('access_token')
export const removeAccessToken = () => removeCookie('access_token')



/**
 * 清除所有cookie
 */
export function clearAllCookie() {
  localStorage.clear()
  sessionStorage.clear()
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      cookie.expire(keys[i])
      cookie.expire(keys[i], { domain })
    }
  }
}