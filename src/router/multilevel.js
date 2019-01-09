import Layout from '_views/Layout/Layout.vue'
export default {
  path: '/multilevel',
  name: 'multilevel',
  redirect: '/multilevel/level1',
  component: Layout,
  meta: {
    title: '多级',
    icon: 'printer',
  },
  children: [
    {
      path: 'level1',
      name: 'level1',
      meta: {
        title: 'level1',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "multilevel" */
        '_views/Multilevel/Level1.vue'
      ),
    }, {
      path: 'level2',
      name: 'level2',
      meta: {
        title: 'level2',
        icon: 'printer',
      },
      component: () => import(
        /* webpackChunkName: "multilevel" */
        '_views/Multilevel/Level2/Level2.vue'
      ),
      children: [
        {
          path: 'level2-1',
          name: 'level2-1',
          meta: {
            title: 'level2-1',
            icon: 'printer',
          },
          component: () => import(
            /* webpackChunkName: "multilevel" */
            '_views/Multilevel/Level2/Level2-1.vue'
          ),
        }, {
          path: 'level2-2',
          name: 'level2-2',
          meta: {
            title: 'level2-2',
            icon: 'printer',
          },
          component: () => import(
            /* webpackChunkName: "multilevel" */
            '_views/Multilevel/Level2/Level2-2.vue'
          ),
        }
      ]
    }
  ]
}