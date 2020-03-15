enum PAGES {
    ROOT = 'ROOT', // Only defined path '/', redirects to login
    HOME = 'HOME',
    LOGIN = 'LOGIN',
}

export enum PAGES_GUARD {
    // Any user can access
    PUBLIC = 'PUBLIC',
    // Only user with valid session can access
    PRIVATE = 'PRIVATE',
    // Only user without session can access
    NO_SESSION = 'NO_SESSION',
}

export default PAGES;
