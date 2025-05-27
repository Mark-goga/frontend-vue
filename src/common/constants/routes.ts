export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    SESSIONS: '/sessions',
  },
  FILMS: {
    DETAILS: '/films/:id',
  },
  USER: {
    REVIEWS: '/user/reviews',
  },
} as const;

Object.freeze(ROUTES);
