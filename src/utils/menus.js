export const path = {
  defaultPath: '',
  allLeafPaths: []
}
// 生成序列
export const getQuene = (list, par_q, par_p = []) => {
  if (!list || !list.length) {
    return []
  }
  let cur_q = 1
  return list.map(lis => {
    let _id = cur_q++
    if (par_q) {
      _id = `${par_q}.${_id}`
    }
    lis.id = _id.toString()
    if (lis.path) {
      lis.fullPath = [...par_p, lis.path]
    } else {
      lis.fullPath = [...par_p]
    }
    if (!lis.children || !lis.children.length) {
      if (lis.isDefault) {
        path.defaultPath = lis.path
      }
      path.allLeafPaths.push(lis.path)
    }
    lis.children = getQuene(lis.children, _id, lis.fullPath)
    return lis
  })
}


export const flatMenus = (menus, menuMap = {}, pPath = []) => {
  menus.forEach(menu => {
    let _pathArr = [...pPath]
    if (menu.path) {
      _pathArr.push(menu.path)
      menuMap[`/${_pathArr.join('/')}`] = menu
    }
    if (menu.children && menu.children.length && menu.showChilds === true) {
      flatMenus(menu.children, menuMap, [..._pathArr])
    }
  })
  return menuMap
}
