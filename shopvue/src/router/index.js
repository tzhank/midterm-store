import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import CatalogView from '../views/CatalogView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'catalog', component: CatalogView },
  // Dynamic route: :id changes for every product
  { path: '/product/:id', name: 'product', component: ProductView, props: true },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

// Navigation guard: protected pages need login
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router