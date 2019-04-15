// hideInMenu: true,        // 不显示在左侧菜单栏
// alwaysShow: true,        // 只有一个子组件时是否显示根组件

import common from './common'
import multilevel from './multilevel'
import shop from './shop'
import order from './order'
import personal from './personal'
import admin from './admin'
import account from './account'
import ticket from './ticket'

export default [
  ...common,
  // multilevel,
  account,
  // shop,
  // order,
  personal,
  ticket,
  // admin,
]