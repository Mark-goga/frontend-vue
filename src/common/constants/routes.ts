export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    SESSIONS: '/sessions',
  },
} as const;

Object.freeze(ROUTES);
