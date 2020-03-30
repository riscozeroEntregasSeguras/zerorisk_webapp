enum ACTIONS {
    // Global
    APP_STATUS = 'APP_STATUS',
    // User
    USER_REGISTER = 'USER_REGISTER',
    USER_REQUEST_TOKEN = 'USER_REQUEST_TOKEN',
    USER_LOAD_DATA = 'USER_LOAD_DATA',
    USER_GET_REGISTER = 'USER_GET_REGISTER',
    USER_LOGOUT = 'USER_LOGOUT',
    USER_CHANGE_STATE = 'USER_CHANGE_STATE',
    USER_CHANGE_LOCATION = 'USER_CHANGE_LOCATION',
    USER_INVITE_USERS = 'USER_INVITE_USERS',
    // Notifications
    NOTIFICATION_CREATE = 'NOTIFICATION_CREATE',
    // INVITATIONS
    INVITATIONS_LOAD = 'INVITATIONS_LOAD',
    INVITATIONS_ACCEPT = 'INVITATIONS_ACCEPT',
    INVITATIONS_REJECT = 'INVITATIONS_REJECT',
    // CIRCLE
    CIRCLE_LOAD = 'CIRCLE_LOAD',
}

export default ACTIONS;