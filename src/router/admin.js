import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/admin',
  name: 'admin',
  meta: {
    title: '管理员管理',
    icon: 'z-yly_guanliyuan',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/admin/adminList',
  children: [
    {
      path: 'adminList',
      name: 'adminList',
      meta: {
        title: '管理员列表',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "admin" */
        '_views/Admin/AdminList/AdminList.vue'
      ),
    }
  ]
}