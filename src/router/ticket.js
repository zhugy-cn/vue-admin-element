import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/ticket',
  name: 'ticket',
  meta: {
    title: '资格券管理',
    icon: 'z-dianpu',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/ticket/ticketSell',
  children: [
    {
      path: 'ticketSell',
      name: 'ticketSell',
      meta: {
        title: '转让资格券',
        icon: 'z-dianpu',
      },
      component: () => import(
        /* webpackChunkName: "ticket" */
        '_views/Ticket/TicketSell/TicketSell.vue'
      ),
    }
  ]
}