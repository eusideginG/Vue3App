import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: { path: '/dishes' },
      component: () => import('../App.vue')
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: () => import('../views/DishesView.vue')
    },
    {
      path: '/dishes/:id',
      name: 'dish',
      component: () => import('../views/DishView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('../views/ReviewView.vue')
    }
  ]
})

export default router
