import { AxiosError } from 'axios';
// Apis per object concern
import UserApi from './apis/user';

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
  user: UserApi,
};
