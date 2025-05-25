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
} as const;

Object.freeze(ROUTES);
