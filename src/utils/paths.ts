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
    uploadTest: {
      path: '',
    },
    myTests: {
      path: 'user/:test',
    },
    discussion: {
      path: 'discussions/:discussionId',
    },
    users: {
      path: 'users',
    },
    profile: {
      path: 'profile',
    },
  },
};
