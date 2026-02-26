export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/register',
    },
    login: {
      path: '/login',
    },
  },
  app: {
    root: {
      path: '/app',
    },
    getTestOverview: {
      path: '/test/:id',
    },
    profile: {
      path: '/profile',
    },
    myTests: {
      path: '/myTests',
    },
    testRun: {
      path: '/test-run/:runId',
    },
  },
};
