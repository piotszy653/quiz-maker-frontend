import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Registration from './views/Registration'
import Friends from './views/FriendsView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends
    }
  ]
})
