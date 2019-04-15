import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/personal',
  name: 'personal',
  meta: {
    title: '人员管理',
    icon: 'z-iconfontzhizuobiaozhun0250',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/personal/personalList',
  children: [
    {
      path: 'personalList',
      name: 'personalList',
      meta: {
        title: '人员列表',
        icon: 'z-iconfontzhizuobiaozhun0250',
      },
      component: () => import(
        /* webpackChunkName: "personal" */
        '_views/Personal/PersonalList/PersonalList.vue'
      ),
    }
  ]
}