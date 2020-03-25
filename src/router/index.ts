import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { PAGES, PAGES_GUARD } from './pages';
import navigationGuard from './navigationGuard';
// Page views
import ViewHome from '../views/home.vue';
import ViewLogin from '../views/login.vue';
import ViewCircle from '../views/circle.vue';
import ViewRegistration from '../views/registration.vue';
import ViewInvitation from '../views/invitations.vue';

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
    routeClass: 'page--home',
  },
};

const ROUTER_LOGIN: RouteConfig = {
  path: '/login',
  name: PAGES.LOGIN,
  component: ViewLogin,
  meta: {
    pageGuard: PAGES_GUARD.NO_SESSION,
    routeClass: 'page--login',
  },
};

const ROUTER_CIRCLE: RouteConfig = {
  path: '/circle',
  name: PAGES.CIRCLE,
  component: ViewCircle,
  meta: {
    pageGuard: PAGES_GUARD.PRIVATE,
    routeClass: 'page--circle',
  },
};

const ROUTER_REGISTER: RouteConfig = {
  path: '/register',
  name: PAGES.REGISTER,
  component: ViewRegistration,
  meta: {
    pageGuard: PAGES_GUARD.NO_SESSION,
    routeClass: 'page--register',
  },
};

const ROUTER_INVITATIONS: RouteConfig = {
  path: '/invitations',
  name: PAGES.INVITATIONS,
  component: ViewInvitation,
  meta: {
    pageGuard: PAGES_GUARD.PRIVATE,
    routeClass: 'page--invitations',
  },
};

// Need for components/utilities to check on defined routes
export const routes = [
  ROUTE_ROOT,
  ROUTER_HOME,
  ROUTER_LOGIN,
  ROUTER_CIRCLE,
  ROUTER_REGISTER,
  ROUTER_INVITATIONS,
];

const router = new VueRouter({ routes });
router.beforeEach(navigationGuard);

export default router;
