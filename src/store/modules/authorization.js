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
    signIn({ commit }, payload) {
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
            const { jwt } = response.data;
            commit('AUTH_SUCCESS', jwt);

            resolve(response);
          })
          .catch(error => {
            commit('AUTH_ERROR');
            localStorage.removeItem('jwt');
            reject(error);
          });
      });
    },
    signUp({ commit }, payload) {
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

            resolve(response);
          })
          .catch(err => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('jwt');
            reject(err);
          });
      });
    },
    signOut({ commit }) {
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
