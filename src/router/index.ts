import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import PAGES, { PAGES_GUARD } from './pages';
import navigationGuard from './navigationGuard';
// Page views
import ViewHome from '../views/home.vue';

Vue.use(VueRouter);

const ROUTE_ROOT: RouteConfig = {
  path: '/',
  name: PAGES.ROOT,
  redirect: { name: PAGES.HOME },
};

const ROUTER_HOME: RouteConfig = {
  path: '/home',
  name: PAGES.HOME,
  component: ViewHome,
  meta: {
    pageGuard: PAGES_GUARD.PUBLIC,
    routeClass: 'routeCenterCard',
  },
};

// Need for components/utilities to check on defined routes
export const routes = [
  ROUTE_ROOT,
  ROUTER_HOME,
];

const router = new VueRouter({ routes });
router.beforeEach(navigationGuard);

export default router;
