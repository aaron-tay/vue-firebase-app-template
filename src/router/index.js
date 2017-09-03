import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from '@/components/Home';
import AccountLogin from '@/components/Login';
import AccountLogout from '@/components/Logout';
import Core4xx from '@/components/4xx';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: AccountLogin,
      meta: {
        redirectIfAuthenticated: true,
        whenAuthenticatedRedirectToRouteName: 'Home',
      },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuthentication: true,
      },
    },
    {
      path: '/logout',
      name: 'Logout',
      component: AccountLogout,
    },
    {
      path: '*',
      name: 'Core4xx',
      component: Core4xx,
    },
  ],
});

// This sets up the router guards for authenticated urls
router.beforeEach((to, from, next) => {
  const isAppInitialised = store.getters['nexus/isAppInitialised'];
  const isAuthenticated = store.getters.isAuthenticated;

  // This guard is only enabled once the app has started and will make future transitions nicer
  // See App.vue for complementary behaviour for when the app has just initialised.
  if (isAppInitialised) {
    // NOTE(ajt): Standard 'redirect' is used since the previous page exists.
    // Check if authentication state permits access to route. If not, redirect
    if (to.matched.some(record => record.meta.requiresAuthentication)) {
      if (!isAuthenticated) {
        return next({
          name: 'Login',
          query: { redirect: to.fullPath },
        });
      }
    }

    // In general, any successfully authenticated user should never see /login or /register
    // This guards the route for cases when the app has initialised and running
    if (to.matched.some(record => record.meta.redirectIfAuthenticated)) {
      if (isAuthenticated) {
        return next({
          name: to.meta.whenAuthRedirectName,
        });
      }
    }
  }

  return next();
});

export default router;
