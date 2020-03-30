import { USER_LOCATION, USER_STATUS } from './user';

export default interface CIRCLE_USER {
    id: string
    name: string
    nickname: string
    location: USER_LOCATION
    status: USER_STATUS
    avatar: string
}
