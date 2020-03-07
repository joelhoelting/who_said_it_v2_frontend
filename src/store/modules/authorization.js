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
          auth: { email, password }
        } = payload;

        plainAxiosInstance
          .post('/signin', {
            auth: {
              email,
              password
            }
          })
          .then(response => {
            const {
              user: { email },
              jwt
            } = response.data;
            commit('AUTH_SUCCESS', jwt);

            console.log(response);

            const notification = {
              type: 'success',
              message: `${email} -- You are now signed in`
            };

            dispatch('notification/add', notification, { root: true });

            setTimeout(() => {
              dispatch('disableLoadingAnimation', null, { root: true });
              resolve(response);
            }, 500);
          })
          .catch(error => {
            commit('AUTH_ERROR');

            const notification = {
              type: 'error',
              message: error
            };

            dispatch('notification/add', notification, { root: true });

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
            const { jwt, user } = response.data;
            commit('AUTH_SUCCESS', jwt, user);

            setTimeout(() => {
              resolve(response);
              dispatch('disableLoadingAnimation', null, { root: true });
            }, 500);
          })
          .catch(error => {
            commit('AUTH_ERROR', error);

            const notification = {
              type: 'error',
              message: error.response.data.error
            };

            dispatch('notification/add', notification, { root: true });

            localStorage.removeItem('jwt');
            dispatch('disableLoadingAnimation', null, { root: true });

            reject(error);
          });
      });
    },
    signOut({ commit, dispatch }) {
      const notification = {
        type: 'success',
        message: 'You are signed out'
      };

      dispatch('notification/add', notification, { root: true });
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
