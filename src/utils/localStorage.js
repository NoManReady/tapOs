export function saveToLocal(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}

export function loadFromLocal(name) {
  let localStorageName = window.localStorage.getItem(name)
  try {
    if (localStorageName) {
      return JSON.parse(localStorageName)
    } else {
      return ''
    }
  } catch (e) {
    return localStorageName
  }
}

export function removeFromLocal(name) {
  window.localStorage.removeItem(name)
}



export function saveToSession(name, value) {
  window.sessionStorage.setItem(name, JSON.stringify(value))
}

export function loadFromSession(name) {
  let sessionStorageName = window.sessionStorage.getItem(name)
  try {
    if (sessionStorageName) {
      return JSON.parse(sessionStorageName)
    } else {
      return ''
    }
  } catch (e) {
    return sessionStorageName
  }
}

export function removeFromSession(name) {
  window.sessionStorage.removeItem(name)
}


