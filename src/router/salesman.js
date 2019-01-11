import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/salesman',
  name: 'salesman',
  meta: {
    title: '业务员管理',
    icon: 'z-iconfontzhizuobiaozhun0250',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/salesman/salesmanList',
  children: [
    {
      path: 'salesmanList',
      name: 'salesmanList',
      meta: {
        title: '业务员列表',
        icon: 'z-iconfontzhizuobiaozhun0250',
      },
      component: () => import(
        /* webpackChunkName: "salesman" */
        '_views/Salesman/SalesmanList/SalesmanList.vue'
      ),
    }
  ]
}