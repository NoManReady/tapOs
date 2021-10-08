import { deCentralizationUmd } from '@/utils'
import { accessToken } from '@/config'
const routes = deCentralizationUmd(require.context('./modules', true, /\.\/\w+\.js/), (a, b) => [...a, ...b])

routes.push(
  {
    path: '*',
    redirect: () => {
      if (accessToken()) {
        return { name: 'Admin' }
      } else {
        return { name: 'Login' }
      }
    }
  }
)
export default routes