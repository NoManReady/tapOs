/**
 * 由于加载问题，语言包全部加载，不做按需加载！！！
 */

//i18n-setup.js
import Vue from "vue"
import VueI18n from "vue-i18n"
// import { getLanguage } from '@/api/modules/common'
const isAcceptLang = () => true
const DEF_LANG = '150601'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: null,
  fallbackLocale: DEF_LANG,
  messages: {}
})

// ElementLocale.i18n((key, value) => i18n.t(key, value))

// 已加载过的语言
const loadedLangs = []

function setI18nLanguage(lang) {
  if (!isAcceptLang(lang)) {
    lang = DEF_LANG
  }
  i18n.locale = lang
  // axios.defaults.headers.common["Accept-Language"] = lang
  document.querySelector("html").setAttribute("lang", lang)
  return lang
}
/**
 * 设置i18n语言，异步加载语言包并设置语言环境
 */
export function setLangAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLangs.includes(lang)) {
      return getLanguage(lang).then(pack => {
        i18n.setLocaleMessage(lang, pack)
        loadedLangs.push(lang)
        return setI18nLanguage(lang)
      }).catch(() => {
        return null
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return lang
}

window.I18N = i18n
// setLangAsync(DEF_LANG)