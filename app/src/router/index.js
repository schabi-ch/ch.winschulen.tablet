import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
    const fromHistory = Boolean(savedPosition);
    if (fromHistory && store.state.app.routerHistory.length > 0) {
      store.state.app.routerHistory.splice(-1, 1);
    } else {
      if (from.name != "home") {
      store.state.app.routerHistory.push(from);
      }
    }

    return savedPosition || { x: 0, y: 0 };
  },
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
