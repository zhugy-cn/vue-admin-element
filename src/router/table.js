import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/table',
  name: 'table',
  meta: {
    title: '表格',
    icon: 'printer',
  },
  component: Layout,
  redirect: '/table/table1',
  children: [
    {
      path: 'table1',
      name: 'table1',
      meta: {
        title: '表格1',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "table" */
        '_views/Table/Table1.vue'
      ),
    },
    {
      path: 'table2',
      name: 'table2',
      meta: {
        title: '表格2',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "table" */
        '_views/Table/Table2.vue'
      ),
    }
  ]
}