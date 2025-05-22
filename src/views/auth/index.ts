import { ROUTES } from '@/common/constants/routes';

export const authRoutes = [
  {
    path: ROUTES.AUTH.REGISTER,
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ './register/RegisterView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: ROUTES.AUTH.LOGIN,
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './login/LoginView.vue'),
    meta: { requiresGuest: true },
  },
];
