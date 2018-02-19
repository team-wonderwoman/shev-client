import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Join from '@/components/Join'
// import GroupSide from '@/components/GroupSide'
import Groups from '@/components/Groups'
import ChatSide from '@/components/ChatSide'
import ChatBox from '@/components/ChatBox'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Join
    },
    {
      path: '/main',
      component: Groups
    },
    {
      path: '/group1',
      component: ChatSide,
      children: [
        {path: 'topic1', component: ChatBox}
      ]
    }
  ]
})
