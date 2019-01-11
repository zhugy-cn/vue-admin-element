import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/shop',
  name: 'shop',
  meta: {
    title: '店铺管理',
    icon: 'z-dianpu',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/shop/shopList',
  children: [
    {
      path: 'shopList',
      name: 'shopList',
      meta: {
        title: '店铺列表',
        icon: 'z-dianpu',
      },
      component: () => import(
        /* webpackChunkName: "shop" */
        '_views/Shop/ShopList/ShopList.vue'
      ),
    }
  ]
}