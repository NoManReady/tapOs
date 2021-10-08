/**
 * 基础路由（无认证）
 */

export default [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'Login'
  },
]