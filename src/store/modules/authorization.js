import { plainAxiosInstance } from '@/axios';

const authorizationModule = {
  namespaced: true,
  state: {
    status: '',
    jwt: localStorage.getItem('jwt') || '',
    user: {}
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'pending';
    },
    AUTH_SUCCESS(state, jwt, user) {
      localStorage.setItem('jwt', jwt);

      state.status = 'success';
      state.jwt = jwt;
      state.user = user;
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
    signIn({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        const { email, password } = credentials;

        plainAxiosInstance
          .post('/signin', { email, password })
          .then(response => {
            const { jwt, user } = response.data;
            commit('AUTH_SUCCESS', jwt, user);

            resolve(response);
          })
          .catch(err => {
            commit('AUTH_ERROR');
            localStorage.removeItem('jwt');
            reject(err);
          });
      });
    },
    signUp({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        const { email, password, password_confirmation } = credentials;

        plainAxiosInstance
          .post('/signup', { email, password, password_confirmation })
          .then(response => {
            const { jwt, user } = response.data;
            console.log('response', response);
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    authStatus: state => state.status
  }
};

export default authorizationModule;
