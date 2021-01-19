import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'Page',
      redirect:'/page'
    },
    {
      path:'/page',//首页
      name:'Page',
      component:resolve=>require(['@/views/index'],resolve),
    },
    {
      path:'/pools',//矿池
      name:'Pools',
      component:resolve=>require(['@/views/pools'],resolve)
    },
    {
      path:'/bonds',//债券
      name:'Bonds',
      component:resolve=>require(['@/views/bonds'],resolve)
    },
    {
      path:'/about',//关于
      name:'About',
      component:resolve=>require(['@/views/about'],resolve)
    }
  ]
})
