import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/form',
  name: 'form',
  meta: {
    title: '表单',
    icon: 'printer',
  },
  component: Layout,
  redirect: '/form/form1',
  children: [
    {
      path: 'form1',
      name: 'form1',
      meta: {
        title: '表单1',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "form" */
        '_views/Form/Form1.vue'
      ),
    },
    {
      path: 'form2',
      name: 'form2',
      meta: {
        title: '表单2',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "form" */
        '_views/Form/Form2.vue'
      ),
    }
  ]
}