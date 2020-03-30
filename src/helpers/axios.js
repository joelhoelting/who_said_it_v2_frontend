import { plainAxiosInstance } from '@/axios';

export const authAPIHelper = (vuexObj, options) => {
  const { commit, dispatch } = vuexObj;
  let { apiRoute, payload, loadingAction } = options;

  loadingAction = loadingAction.charAt(0).toUpperCase() + loadingAction.slice(1);
  dispatch(`enable${loadingAction}`, null, { root: true });

  return new Promise((resolve, reject) => {
    commit('AUTH_REQUEST');

    plainAxiosInstance
      .post(apiRoute, payload)
      .then(response => {
        commit('AUTH_PENDING');

        const notification = {
          type: 'success',
          message: response.data.success
        };

        setTimeout(() => {
          dispatch('notification/addNotification', notification, { root: true });
          dispatch(`disable${loadingAction}`, null, { root: true });
          return resolve(response);
        }, 500);
      })
      .catch(error => {
        commit('AUTH_ERROR', error);

        const notification = {
          type: 'error',
          message: error.response.data.error
        };

        setTimeout(() => {
          dispatch('notification/addNotification', notification, { root: true });
          dispatch(`disable${loadingAction}`, null, { root: true });
          return reject(error);
        }, 500);
      });
  });
};
