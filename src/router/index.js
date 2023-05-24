import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WizardView from '../views/WizardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: WizardView
    },
    {
      path: '/my-cvs',
      name: 'my-cvs',
      component: () => import('../views/MyCvsView.vue')
    }
  ]
})

export default router
