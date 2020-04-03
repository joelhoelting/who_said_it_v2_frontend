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
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'signin',
            delay: 500,
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation'
          }
        );

        const { jwt } = response.data;
        commit('AUTH_SUCCESS', jwt);
      } catch (error) {
        throw error;
      }
    },
    async signUp({ commit, dispatch }, payload) {
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'signup',
            delay: 500,
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation'
          }
        );
      } catch (error) {
        throw error;
      }
    },
    async confirmEmail({ commit, dispatch }, payload) {
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'confirm_email',
            delay: 500,
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingOverlay'
          }
        );

        const { jwt } = response.data;
        commit('AUTH_SUCCESS', jwt);
      } catch (error) {
        throw error;
      }
    },
    resendConfirmationEmail({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        {
          apiRoute: 'resend_confirmation_email',
          delay: 500,
          httpMethod: 'post',
          payload,
          loadingAction: 'loadingAnimation'
        }
      );
    },
    requestPasswordReset({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        {
          apiRoute: 'request_password_reset',
          delay: 500,
          httpMethod: 'post',
          payload,
          loadingAction: 'loadingAnimation'
        }
      );
    },
    async isPasswordResetTokenValid({ commit, dispatch }, payload) {
      const { token } = payload;

      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: `confirm_password_reset_token/${token}`,
            delay: 500,
            httpMethod: 'get',
            payload,
            loadingAction: 'loadingOverlay'
          }
        );
      } catch (error) {
        throw error;
      }
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
