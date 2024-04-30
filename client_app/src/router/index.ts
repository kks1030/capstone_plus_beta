import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('../pages/settings/Settings.vue'),
      },
      {
        name: 'preferences',
        path: 'preferences',
        component: () => import('../pages/preferences/Preferences.vue'),
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('../pages/users/UsersPage.vue'),
      },
      {
        name: 'project',
        path: '/projects',
        component: RouteViewComponent,
        children: [
          {
            name: 'project-management',
            path: 'project-management',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
          {
            name: 'project-progress',
            path: 'project-progress',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
        ],
      },
      {
        name: 'worker-management',
        path: '/worker-management',
        component: () => import('../pages/projects/ProjectsPage.vue'),
      },
      {
        name: 'work-verification',
        path: '/work-verification',
        component: RouteViewComponent,
        children: [
          {
            name: 'data-view',
            path: 'data-view',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
          {
            name: 'translation',
            path: 'translation',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
          {
            name: 'proofreading',
            path: 'proofreading',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
          {
            name: 'final-review',
            path: 'final-review',
            component: () => import('../pages/projects/ProjectsPage.vue'),
          },
        ],
      },
{
    name: 'request',
    path: 'request',
    component: () => import('../pages/uploader/Uploader.vue'),
},
{
  name: 'control',
  path: 'request/:timestamp/control',
  component: () => import('../pages/control/Control.vue'),
},

{
    name: 'me',
    path: 'users/me',
    component: () => import('../pages/me/Me.vue'),
},
{
    name: 'users1',
    path: 'users/:userid?',
    component: () => import('../pages/users1/Users1.vue'),
    props: true,
},
      {
        name: 'faq',
        path: '/faq',
        component: () => import('../pages/faq/FaqPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/RecoverPassword.vue'),
      },
      {
        name: 'recover-password-email',
        path: 'recover-password-email',
        component: () => import('../pages/auth/CheckTheEmail.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // 스크롤 동작 제어
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

export default router
