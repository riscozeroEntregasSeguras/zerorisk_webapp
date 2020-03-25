import HTTP from '../http';

export default {
  pending() {
    return HTTP.api().get('/invitations/pending');
  },
  accept(id: string) {
    return HTTP.api().post(`/invitations/${id}/accept`);
  },
  reject(id: string) {
    return HTTP.api().post(`/invitations/${id}/reject`);
  },
};
