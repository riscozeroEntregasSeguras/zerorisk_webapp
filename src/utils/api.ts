import { AxiosError } from 'axios';
// Apis per object concern
import GlobalApi from './apis/global';
import UserApi from './apis/user';
import InvitationsApi from './apis/invitations';
import CircleApi from './apis/circle';

export default {
  /**
   * Consolidate error into the same error object.
   * @param RequestError
   */
  buildError(RequestError: AxiosError): any {
    // On missing error object, return a generic one
    const genericError = {
      inputs: {},
      valid: false,
      message: 'Api error',
      data: {},
      error: {
        code: 700,
        message: 'In app message error. (Axios failed)',
        details: undefined,
      },
    };

    if (!RequestError) return genericError;
    if (!RequestError.response) return genericError;

    return RequestError.response.data;
  },
  global: GlobalApi,
  user: UserApi,
  invitations: InvitationsApi,
  circle: CircleApi,
};
