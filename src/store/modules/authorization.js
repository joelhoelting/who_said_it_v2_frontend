import { plainAxiosInstance } from '@/axios';

const authorizationModule = {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'pending';
    },
    AUTH_SUCCESS(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    AUTH_ERROR(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    signin({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');

        const { email, password } = user;
        plainAxiosInstance
          .post('/signin', { email, password })
          .then(response => {
            console.log(response);
            // commit('AUTH_SUCCESS', token, user);
            resolve(response);
          })
          .catch(err => {
            commit('AUTH_ERROR');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    }
    // register({ commit }, user) {
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request');
    //     axios({
    //       url: 'http://localhost:3000/register',
    //       data: user,
    //       method: 'POST'
    //     })
    //       .then(response => {
    //         const token = response.data.token;
    //         const user = response.data.user;
    //         localStorage.setItem('token', token);
    //         // Add the following line:
    //         axios.defaults.headers.common['Authorization'] = token;
    //         commit('AUTH_SUCCESS', token, user);
    //         resolve(response);
    //       })
    //       .catch(err => {
    //         commit('AUTH_ERROR', err);
    //         localStorage.removeItem('token');
    //         reject(err);
    //       });
    //   });
    // },
    // logout({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     commit('logout');
    //     localStorage.removeItem('token');
    //     delete axios.defaults.headers.common['Authorization'];
    //     resolve();
    //   });
    // }
  }
};

export default authorizationModule;
