import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



const withList = ['login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { token } = store.getters;
  const toName = to.name;
  // if (!token && !withList.includes(toName)) {
  //   return next('/login');
  // }
  // if (token && withList.includes(toName)) {
  //   return next('/dashboard');
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router;