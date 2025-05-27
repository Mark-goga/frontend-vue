export const userRoutes = [
  {
    path: '/user/reviews/:userId',
    name: 'user-reviews',
    component: () =>
      import(/* webpackChunkName: "home" */ './pages/user-reviews/UserReviewsPage.vue'),
    meta: { requiresAuth: false },
  },
];
