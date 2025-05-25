export const filmsRoutes = [
  {
    name: 'films',
    path: '/films/:filmId',
    component: () => import(/* webpackChunkName: "films" */ './details/DetailsVue.vue'),
    meta: { requiresAuth: false },
  },
];
