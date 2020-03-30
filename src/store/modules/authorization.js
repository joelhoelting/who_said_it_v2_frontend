import { authorizedAxiosInstance } from '@/axios';
import { authAPIHelper } from '@/helpers/axios';

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
    async signIn({ commit, dispatch }, payload) {
      let response = await authAPIHelper(
        { commit, dispatch },
        { apiRoute: 'signin', payload, loadingAction: 'loadingAnimation' }
      );

      const { jwt } = response.data;
      commit('AUTH_SUCCESS', jwt);
    },
    signUp({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        { apiRoute: 'signup', payload, loadingAction: 'loadingAnimation' }
      );
    },
    confirmEmail({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        { apiRoute: 'confirm_email', payload, loadingAction: 'loadingOverlay' }
      );
    },
    resendConfirmationEmail({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        { apiRoute: 'resend_confirmation_email', payload, loadingAction: 'loadingAnimation' }
      );
    },
    requestPasswordReset({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        { apiRoute: 'request_password_reset', payload, loadingAction: 'loadingAnimation' }
      );
    },
    isPasswordResetTokenValid({ commit, dispatch }, payload) {
      const { token } = payload;

      authAPIHelper(
        { commit, dispatch },
        {
          apiRoute: `confirm_password_reset_token/${token}`,
          payload,
          loadingAction: 'loadingAnimation'
        }
      );
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
      return new Promise(() => {
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
