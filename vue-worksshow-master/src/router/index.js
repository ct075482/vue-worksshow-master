import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import Main from '@/components/Main'
import OneShow from '@/components/OneShow'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserInfo from '@/components/UserInfo'
import UploadWorks from '@/components/UploadWorks'
import Introduction from '@/components/Introduction'
import WorksList from '@/components/WorksList'
import OneWorksInfo from '@/components/OneWorksInfo'
import MatchList from '@/components/MatchList'
import MatchFile from '@/components/MatchFile'
import MatchNews from '@/components/MatchNews'
import NewsInfo from '@/components/NewsInfo'
import WorksFilter from '@/components/WorksFilter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Index',
          component: Index,
          children: [
            {
              path: '/',
              component: Main
            },
            {
              path: '/MatchList',
              name: 'MatchList',
              component: MatchList
            },
            {
              path: '/WorksFilter',
              name: 'WorksFilter',
              component: WorksFilter
            },
            {
              path: '/MatchNews',
              name: 'MatchNews',
              component: MatchNews
            },
            {
              path: '/MatchFile/:matchId',
              name: 'MatchFile',
              component: MatchFile
            },
            {
              path: '/NewsInfo/:newsId',
              name: 'NewsInfo',
              component: NewsInfo
            },
            {
              path: '/OneShow/:worksId',
              name: 'OneShow',
              component: OneShow
            },
            {
              path: '/UserInfo',
              name: 'UserInfo',
              component: UserInfo,
              children: [
                {
                  path: '/',
                  name: 'WorksList',
                  component: WorksList
                },
                {
                  path: '/OneWorksInfo/:worksId',
                  name: 'OneWorksInfo',
                  component: OneWorksInfo
                }
              ]
            },
            {
              path: '/UploadWorks',
              component: UploadWorks
            },
            {
              path: '/Introduction',
              component: Introduction
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    }
  ]
})
