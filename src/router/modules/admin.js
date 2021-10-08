/**
 * admin认证页面
 */

import { deCentralizationUmd, logout } from '@/utils'
import { accessToken } from '@/config'

const Admin = () => import('@/views/Admin')

const childrenRoutes = deCentralizationUmd(require.context('./admin', true, /\.\/\w+\.js/), (a, b) => [...a, ...b])


childrenRoutes.push(
  {
    path: '404',
    component: () => import('@/views/statusPage/404.vue'),
    name: 'Hall404'
  },
)
const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: () => {
      if (accessToken()) {
        return { name: 'Home' }
      } else {
        logout()
      }
    },
    children: childrenRoutes
  },
]

export default routes
