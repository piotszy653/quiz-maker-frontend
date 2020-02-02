import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Login from './views/user/Login'
import Registration from './views/user/Registration'
import Friends from './views/user/FriendsView'
import ForgotPassword from './views/user/password/ForgotPasswordView'
import ResetPassword from './views/user/password/ResetPasswordView'
import Assessments from './views/quiz/assessment/AssessmentsView'
import Assessment from './views/quiz/assessment/AssessmentView'
import Quizzes from './views/quiz/QuizzesView'
import Quiz from './views/quiz/QuizView'
import Questions from './views/quiz/question/QuestionsView'
import Question from './views/quiz/question/QuestionView'
import Results from './views/quiz/ResultsView'
import ResultDetails from './views/quiz/ResultDetailsView'

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
    },
    {
      path: '/assessments/:quizUuid',
      name: 'Add assessment to quiz',
      component: Assessments,
      props: true
    },
    {
      path: '/assessment/:assessmentUuid',
      name: 'Update Assessment',
      component: Assessment,
      props: true
    },
    {
      path: '/assessment',
      name: 'Create Assessment',
      component: Assessment
    },
    {
      path: '/quizzes',
      name: 'Quizzes',
      component: Quizzes
    },
    {
      path: '/quiz/:quizUuid',
      name: 'Update Quiz',
      component: Quiz,
      props: true
    },
    {
      path: '/quiz',
      name: 'Create Quiz',
      component: Quiz
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Questions
    },
    {
      path: '/questions/:quizUuid',
      name: 'Add Questions to Quiz',
      component: Questions,
      props: true
    },
    {
      path: '/question',
      name: 'Create Question',
      component: Question
    },
    {
      path: '/question/:questionUuid',
      name: 'Update Question',
      component: Question,
      props: true
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/result/:resultUuid',
      name: 'Result',
      component: ResultDetails,
      props: true
    }
  ]
})
