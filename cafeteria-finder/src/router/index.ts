import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/finder',
      name: 'finder',
      component: () => import('../views/FinderView.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: {
        requiresAuth: true
      },
    }
  ]
})

router.beforeEach((to, _, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.isLoggedIn()) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
