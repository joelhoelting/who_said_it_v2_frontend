import { plainAxiosInstance } from '@/axios';

export const authAPIHelper = (vuexObj, options) => {
  const { commit, dispatch } = vuexObj;
  let { apiRoute, delay, httpMethod, payload, loadingAction } = options;

  loadingAction = loadingAction.charAt(0).toUpperCase() + loadingAction.slice(1);
  dispatch(`enable${loadingAction}`, null, { root: true });

  return new Promise((resolve, reject) => {
    commit('AUTH_REQUEST');

    plainAxiosInstance[httpMethod](apiRoute, payload)
      .then(response => {
        commit('AUTH_PENDING');

        const notification = {
          type: 'success',
          message: response.data.success
        };

        setTimeout(() => {
          dispatch('notification/addNotification', notification, {
            root: true
          });
          dispatch(`disable${loadingAction}`, null, { root: true });

          resolve(response);
        }, delay || 0);
      })
      .catch(error => {
        commit('AUTH_ERROR', error);

        const notification = {
          type: 'error',
          message: error.response.data.error
        };

        setTimeout(() => {
          dispatch('notification/addNotification', notification, {
            root: true
          });
          dispatch(`disable${loadingAction}`, null, { root: true });
          reject(error);
        }, delay || 0);
      });
  });
};
