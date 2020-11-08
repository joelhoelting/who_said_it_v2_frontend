import { authorizedAxiosInstance, plainAxiosInstance } from '@/axios';

export const authAPIHelper = (vuexObj, options) => {
  const { commit, dispatch } = vuexObj;
  let { authorized, apiRoute, httpMethod, payload, loadingAction, loadingDelay, stifleNotification = false } = options;

  // loadingAction variations: 'loadingAnimation', 'loadingOverlay
  if (loadingAction) {
    loadingAction = loadingAction.charAt(0).toUpperCase() + loadingAction.slice(1);
    dispatch(`enable${loadingAction}`, null, { root: true });
  }

  // determine plain vs. authorized axios instance
  let axiosInstanceType = authorized ? authorizedAxiosInstance : plainAxiosInstance;

  return new Promise((resolve, reject) => {
    commit('AUTH_REQUEST_PENDING');

    axiosInstanceType[httpMethod](apiRoute, payload)
      .then(response => {
        commit('AUTH_REQUEST_SUCCESS');

        const notification = {
          type: 'success',
          message: response.data.success_msg
        };

        setTimeout(() => {
          if (!stifleNotification) {
            dispatch('notification/addNotification', notification, {
              root: true
            });
          }

          if (loadingAction) dispatch(`disable${loadingAction}`, null, { root: true });
          resolve(response);
        }, loadingDelay || 0);
      })
      .catch(error => {
        commit('AUTH_REQUEST_ERROR');

        const notification = {
          type: 'error',
          message: error.response ? error.response.data.error_msg : error.message
        };

        setTimeout(() => {
          if (!stifleNotification) {
            dispatch('notification/addNotification', notification, {
              root: true
            });
          }

          if (loadingAction) dispatch(`disable${loadingAction}`, null, { root: true });
          reject(error);
        }, loadingDelay || 0);
      });
  });
};
