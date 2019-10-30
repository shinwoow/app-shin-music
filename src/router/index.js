import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: resolve => require(['@/components/Navigation/Navigation'], resolve),
      children: [{
          path: '/',
          name: 'Home',
          component: resolve => require(['@/components/Home/Home'], resolve)
        },
        {
          path: '/UploadMusic',
          name: 'UploadMusic',
          component: resolve => require(['@/components/UploadMusic/UploadMusic'], resolve)
        },
        {
          path: '/Search',
          name: 'Search',
          component: resolve => require(['@/components/Search/Search'], resolve)
        },
        {
          path: '/Setting',
          name: 'Setting',
          component: resolve => require(['@/components/Setting/Setting'], resolve)
        }
      ]
    },
    {
      path: '/MusicButton',
      name: 'MusicButton',
      component: resolve => require(['cmpts/MusicButton/MusicButton'], resolve)
    },
    {
      path: '/MusicBar',
      name: 'MusicBar',
      component: resolve => require(['cmpts/MusicButton/MusicBar'], resolve)

    }
  ]
})
