import { deCentralization } from '@/utils'

const apis = deCentralization(require.context('./modules', true, /\.\/\w+\.js/))
export default apis
