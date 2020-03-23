enum MUTATIONS {
    // Global state
    GLOBAL_SET_API_OFFLINE = 'GLOBAL_SET_API_OFFLINE',
    GLOBAL_MASTER_LOADING_START = 'GLOBAL_MASTER_LOADING_START',
    GLOBAL_MASTER_LOADING_END = 'GLOBAL_MASTER_LOADING_END',
    // User module
    USER_SET_TOKEN = 'USER_SET_TOKEN',
    USER_LOAD_DATA = 'USER_LOAD_DATA',
    USER_LOGOUT = 'USER_LOGOUT',
    // Notifications
    NOTIFICATION_PUSH = 'NOTIFICATION_PUSH',
    NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE',
    NOTIFICATION_REMOVE_ALL = 'NOTIFICATION_REMOVE_ALL',
}

export default MUTATIONS;
