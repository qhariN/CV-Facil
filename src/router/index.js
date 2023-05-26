import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WizardView from '../views/WizardView.vue'
import HomeBackground from '../components/HomeBackground.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeBackground,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'my-cvs',
          name: 'my-cvs',
          component: () => import('../views/MyCvsView.vue')
        }
      ]
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: WizardView
    }
  ]
})

export default router
