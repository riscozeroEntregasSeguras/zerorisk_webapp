import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { PAGES, PAGES_GUARD } from './pages';
import navigationGuard from './navigationGuard';
// Page views
import ViewEdit from '../views/edit.vue';
import ViewLogin from '../views/login.vue';
import ViewCircle from '../views/circle.vue';
import ViewRegistration from '../views/registration.vue';
import ViewInvitate from '../views/invite.vue';
import ViewInvitation from '../views/invitations.vue';

Vue.use(VueRouter);

const ROUTE_ROOT: RouteConfig = {
  path: '/',
  name: PAGES.ROOT,
  redirect: { name: PAGES.LOGIN },
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

const ROUTER_REGISTER: RouteConfig = {
  path: '/register',
  name: PAGES.REGISTER,
  component: ViewRegistration,
  meta: {
    pageGuard: PAGES_GUARD.NO_SESSION,
    routeClass: 'page--register',
  },
};

const ROUTER_EDIT: RouteConfig = {
  path: '/edit',
  name: PAGES.EDIT,
  component: ViewEdit,
  meta: {
    pageGuard: PAGES_GUARD.PRIVATE,
    routeClass: 'page--edit',
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

const ROUTER_INVITE: RouteConfig = {
  path: '/invite',
  name: PAGES.INVITE,
  component: ViewInvitate,
  meta: {
    pageGuard: PAGES_GUARD.PRIVATE,
    routeClass: 'page--invite',
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

export const routes = [
  ROUTE_ROOT,
  ROUTER_EDIT,
  ROUTER_LOGIN,
  ROUTER_CIRCLE,
  ROUTER_REGISTER,
  ROUTER_INVITE,
  ROUTER_INVITATIONS,
];

const router = new VueRouter({ routes });
router.beforeEach(navigationGuard);

export default router;
