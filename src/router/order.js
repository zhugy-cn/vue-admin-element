import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/order',
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'z-dingdan',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/order/orderList',
  children: [
    {
      path: 'orderList',
      name: 'orderList',
      meta: {
        title: '订单列表',
        icon: 'z-dingdan',
      },
      component: () => import(
        /* webpackChunkName: "order" */
        '_views/Order/OrderList/OrderList.vue'
      ),
    }
  ]
}