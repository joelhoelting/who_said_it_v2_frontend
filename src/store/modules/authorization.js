import { plainAxiosInstance } from '@/axios';
import { authorizedAxiosInstance } from '../../axios';

const authorizationModule = {
  namespaced: true,
  state: {
    status: '',
    jwt: localStorage.getItem('jwt') || ''
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'pending';
    },
    AUTH_SUCCESS(state, jwt) {
      localStorage.setItem('jwt', jwt);

      state.status = 'success';
      state.jwt = jwt;
    },
    AUTH_PENDING(state) {
      state.status = 'pending';
    },
    AUTH_ERROR(state) {
      state.status = 'error';
    },
    SIGN_OUT(state) {
      localStorage.removeItem('jwt');

      state.status = '';
      state.jwt = '';
    }
  },
  actions: {
    signIn({ commit, dispatch }, payload) {
      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        const {
          auth: { email, password },
          recaptcha: { token }
        } = payload;

        plainAxiosInstance
          .post('/signin', {
            auth: {
              email,
              password
            },
            recaptcha: {
              token
            }
          })
          .then(response => {
            const { jwt } = response.data;

            commit('AUTH_SUCCESS', jwt);

            const notification = {
              type: 'success',
              message: `Sign In Successful`
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            commit('AUTH_ERROR');

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });

            localStorage.removeItem('jwt');

            reject(error);
          });
      });
    },
    signUp({ commit, dispatch }, payload) {
      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        const {
          auth: { email, password, password_confirmation },
          recaptcha: { token }
        } = payload;

        plainAxiosInstance
          .post('/signup', {
            auth: {
              email,
              password,
              password_confirmation
            },
            recaptcha: {
              token
            }
          })
          .then(response => {
            commit('AUTH_PENDING');

            const notification = {
              type: 'success',
              message: `Confirmation email sent to ${email}`
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            commit('AUTH_ERROR', error);

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });

            localStorage.removeItem('jwt');

            reject(error);
          });
      });
    },
    confirmEmail({ commit, dispatch }, payload) {
      dispatch('enableLoadingOverlay', null, { root: true });

      const { confirmToken } = payload;

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('/confirm_email', {
            confirm_token: confirmToken
          })
          .then(response => {
            const { jwt } = response.data;
            commit('AUTH_SUCCESS', jwt);

            const notification = {
              type: 'success',
              message: response.data.success
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingOverlay', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            dispatch('disableLoadingOverlay', null, { root: true });

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/addNotification', notification, { root: true });
            reject(error);
          });
      });
    },
    resendConfirmationEmail({ commit, dispatch }, payload) {
      dispatch('enableLoadingAnimation', null, { root: true });

      const { email } = payload;

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('/resend_confirmation_email', {
            auth: {
              email
            }
          })
          .then(response => {
            const notification = {
              type: 'success',
              message: response.data.success
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    requestPasswordReset({ dispatch }, payload) {
      dispatch('enableLoadingAnimation', null, { root: true });

      const {
        auth: { email },
        recaptcha: { token }
      } = payload;

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('/request_password_reset', {
            auth: {
              email
            },
            recaptcha: {
              token
            }
          })
          .then(response => {
            const notification = {
              type: 'success',
              message: response.data.success
            };

            dispatch('notification/addNotification', notification, { root: true });
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            dispatch('disableLoadingAnimation', null, { root: true });

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/addNotification', notification, { root: true });
            reject(error);
          });
      });
    },
    isPasswordResetTokenValid({ dispatch }, payload) {
      dispatch('enableLoadingOverlay', null, { root: true });

      const { token } = payload;

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .get(`/confirm_password_reset_token/${token}`)
          .then(response => {
            setTimeout(() => {
              dispatch('disableLoadingOverlay', null, { root: true });

              const notification = {
                type: 'success',
                message: response.data.success
              };

              dispatch('notification/addNotification', notification, { root: true });

              resolve(response);
            }, 500);
          })
          .catch(error => {
            dispatch('disableLoadingOverlay', null, { root: true });

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/addNotification', notification, { root: true });
            reject(error);
          });
      });
    },
    resetPassword({ dispatch }, payload) {
      console.log('hello');
    },
    signOut({ commit, dispatch }) {
      const notification = {
        type: 'success',
        message: 'Sign Out Successful'
      };

      dispatch('notification/addNotification', notification, { root: true });
      commit('SIGN_OUT');
    },
    validateToken({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        authorizedAxiosInstance.get('/validate_token').catch(() => {
          dispatch('signOut');
        });
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    authStatus: state => state.status
  }
};

export default authorizationModule;
