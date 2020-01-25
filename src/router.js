import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Login from './views/user/Login'
import Registration from './views/user/Registration'
import Friends from './views/user/FriendsView'
import ForgotPassword from './views/user/password/ForgotPasswordView'
import ResetPassword from './views/user/password/ResetPasswordView'
import Assessments from './views/quiz/assessment/AssessmentsView'

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
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: ResetPassword,
      props: true
    },
    {
      path: '/assessments',
      name: 'Assessments',
      component: Assessments
    }
  ]
})
