export const homeRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './HomeView.vue'),
    meta: { requiresAuth: false },
  },
];
