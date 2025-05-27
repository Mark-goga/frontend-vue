import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authRoutes } from '@/views/auth';
import { useUserStore } from '@/common/store';
import { storeToRefs } from 'pinia';
import { homeRoutes } from '@/views/home';
import { filmsRoutes } from '@/views/films';
import { userRoutes } from '@/views/user';

const routes: Array<RouteRecordRaw> = [...homeRoutes, ...authRoutes, ...filmsRoutes, ...userRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  const { isAuthenticated } = storeToRefs(userStore);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated.value) {
    console.log('Redirecting to login');
    next({ name: 'login' });
  } else if (requiresGuest && isAuthenticated.value) {
    console.log('Redirecting to home');
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
