import { createRouter, createWebHistory } from 'vue-router'
import Questions from '../views/Questions.vue'

const routes = [
  {
    path: '/',
    name: 'Questions',
    component: Questions
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
