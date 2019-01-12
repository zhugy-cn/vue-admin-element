// hideInMenu: true,        // 不显示在左侧菜单栏
// alwaysShow: true,        // 只有一个子组件时是否显示根组件

import common from './common'
import multilevel from './multilevel'
import shop from './shop'
import order from './order'
import salesman from './salesman'
import admin from './admin'

export default [
  ...common,
  // multilevel,
  shop,
  order,
  salesman,
  admin,
]