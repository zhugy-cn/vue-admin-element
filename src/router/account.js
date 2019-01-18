import Layout from '_views/Layout/Layout.vue'

export default {
  path: '/account',
  name: 'account',
  meta: {
    title: '账户管理',
    icon: 'z-yly_guanliyuan',
    alwaysShow: true,
  },
  component: Layout,
  redirect: '/account/assets',
  children: [
    {
      path: 'assets',
      name: 'assets',
      meta: {
        title: '资产管理',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "account" */
        '_views/Account/Assets/Assets.vue'
      ),
    },
    {
      path: 'withdrawList',
      name: 'withdrawList',
      meta: {
        title: '提现记录',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "account" */
        '_views/Account/WithdrawList/WithdrawList.vue'
      ),
    },
    {
      path: 'bankWater',
      name: 'bankWater',
      meta: {
        title: '流水记录',
        icon: 'z-yly_guanliyuan',
      },
      component: () => import(
        /* webpackChunkName: "account" */
        '_views/Account/BankWater/BankWater.vue'
      ),
    }
  ]
}