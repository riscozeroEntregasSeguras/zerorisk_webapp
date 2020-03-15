import { getCookie } from 'tiny-cookie';
import { Route } from 'vue-router';
import store from '../store';
import ACTIONS from '../store/types-actions';
import MUTATIONS from '../store/types-mutations';
import PAGES, { PAGES_GUARD } from './pages';
import ROUTER_QUERIES from './queries';

// Recover session cookie with auth token
// Clean the store if cookie not found
const authCookie = getCookie('authToken');
if (authCookie !== null) {
  store.commit(MUTATIONS.USER_SET_TOKEN, { token: authCookie, keepSignedIn: true });
} else {
  store.commit(MUTATIONS.USER_LOGOUT);
}

/**
 * The navigation guard assures some rules regarding page access
 * are met and takes care of login redirection.
 *
 * CASE 1: the target page is PUBLIC with no restriction regarding
 * user session. Straight forward case, load that page.
 *
 * CASE 2: User has no valid session.
 * Can only visit pages width guard NO_SESSION.
 * Since redirection will be to page login, we save the page he
 * was trying to access in a redirect query to recover
 * after a successful login.
 *
 * CASE 3: User has valid session.
 * Can acess any page with guard PRIVATE.
 * Cannot access any page with guard NO_SESSION case where is redirect
 * to dashboard.
 * Note that after passing CASE 1 and 2 in code, we try to recover the redirect first
 * We only do this once per router guard cycle.
 */

// Keep track that redirection is only performed once.
let redirectOnce = false;

export default async function navigationGuard(to: Route, from: Route, next: any): Promise<void> {
  // Before any logic we have to check if the user data is loaded
  // This action only really runs once.
  // Either there is a  valid session cookie and the user
  // data is fetched or is consider that the user has no valid session.
  // After the first attempt, the action becomes void and does not run again.
  await store.dispatch(ACTIONS.USER_LOAD_DATA);

  // @ts-ignore
  const { validSession } = store.state.user;

  // CASE 1: When a page is public, regardless of user session
  // there is no guard, so we can next() and return
  if (to.meta.pageGuard === PAGES_GUARD.PUBLIC) {
    next();
    return;
  }

  // CASE 2: user has no session
  // Can only visit pages with guard NO_SESSION
  if (!validSession) {
    // If page of type NO_SESSION, can load page
    // Note that pages of guard type PUBLIC where already catch in the
    // first case
    if (to.meta.pageGuard === PAGES_GUARD.NO_SESSION) {
      next();
      return;
    }
    // Redirect to login but saving the target path in the redirect query param
    next({ name: PAGES.LOGIN, query: { [ROUTER_QUERIES.REDIRECT]: to.path } });
    return;
  }

  // For case 3, we try the redirection first.
  // We can redirect if:
  // 1. We have not performed any redirection yet
  // 2. The from route is not null meaning was not a direct link
  // 3. There is a redirect query param in the from route.
  if (!redirectOnce && from !== null && from.query[ROUTER_QUERIES.REDIRECT]) {
    redirectOnce = true;
    next({ path: from.query[ROUTER_QUERIES.REDIRECT] });
    return;
  }

  // Reset redirection if not used for next router cycle
  if (redirectOnce) redirectOnce = false;

  // CASE 3: User can access any page expect
  // for page with guard NO_SESSION
  // In that case, redirect to login
  if (to.meta.pageGuard === PAGES_GUARD.NO_SESSION) {
    next({ name: PAGES.HOME });
    return;
  }

  // Router cycle ends here.
  // All conditions are met and redirection taken care off.
  next();
}
