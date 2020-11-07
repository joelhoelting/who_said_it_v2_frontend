// import { authorizedAxiosInstance } from '@/axios';
import { authAPIHelper } from '@/helpers/axios';

const authorizationModule = {
  namespaced: true,
  state: {
    status: '',
    jwt: localStorage.getItem('jwt') || '',
    user: {
      email: ''
    }
  },
  mutations: {
    AUTH_REQUEST_PENDING(state) {
      state.status = 'pending';
    },
    AUTH_REQUEST_ERROR(state) {
      state.status = 'error';
    },
    AUTH_REQUEST_SUCCESS(state) {
      state.status = 'success';
    },
    UPDATE_LOCAL_AUTH(state, payload) {
      let { jwt, user } = payload;

      if (jwt) localStorage.setItem('jwt', jwt);

      Object.assign(state, {
        jwt,
        status: 'success',
        user
      });
    },
    SIGN_OUT(state) {
      localStorage.removeItem('jwt');

      Object.assign(state, {
        status: '',
        jwt: ''
      });
    }
  },
  actions: {
    // Authorized Actions
    async deleteAccount({ commit, dispatch }) {
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            authorized: true,
            apiRoute: 'delete_account',
            httpMethod: 'get',
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );
        commit('SIGN_OUT');
      } catch (error) {
        throw error;
      }
    },
    async updatePassword({ commit, dispatch }, payload) {
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            authorized: true,
            apiRoute: 'update_password',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );
      } catch (error) {
        throw error;
      }
    },
    async validateToken({ commit, dispatch }) {
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'validate_token',
            httpMethod: 'get',
            authorized: true,
            loadingAction: 'loadingOverlay',
            loadingDelay: 500
          }
        );
        commit('UPDATE_LOCAL_AUTH', response.data);
      } catch (error) {
        commit('SIGN_OUT');
        throw error;
      }
    },
    // Non-authorized Actions
    async confirmEmail({ commit, dispatch }, payload) {
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'confirm_email',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingOverlay',
            loadingDelay: 500
          }
        );

        commit('UPDATE_LOCAL_AUTH', response.data);
      } catch (error) {
        throw error;
      }
    },
    async isPasswordResetTokenValid({ commit, dispatch }, payload) {
      const { password_reset_token } = payload;
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: `confirm_password_reset_token/${password_reset_token}`,
            httpMethod: 'get',
            payload: false,
            loadingAction: 'loadingOverlay',
            loadingDelay: 500
          }
        );
      } catch (error) {
        throw error;
      }
    },
    resendConfirmationEmail({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        {
          apiRoute: 'resend_confirmation_email',
          httpMethod: 'post',
          payload,
          loadingAction: 'loadingAnimation',
          loadingDelay: 500
        }
      );
    },
    requestPasswordReset({ commit, dispatch }, payload) {
      authAPIHelper(
        { commit, dispatch },
        {
          apiRoute: 'request_password_reset',
          httpMethod: 'post',
          payload,
          loadingAction: 'loadingAnimation',
          loadingDelay: 200
        }
      );
    },
    async resetPassword({ commit, dispatch }, payload) {
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'reset_password',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );
      } catch (error) {
        throw error;
      }
    },
    async signIn({ commit, dispatch }, payload) {
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'sign_in',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );

        commit('UPDATE_LOCAL_AUTH', response.data);
      } catch (error) {
        throw error;
      }
    },
    async signUp({ commit, dispatch }, payload) {
      try {
        await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'sign_up',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );
      } catch (error) {
        throw error;
      }
    },

    // Non-API Actions
    signOut({ commit, dispatch }) {
      const notification = {
        type: 'success',
        message: 'Sign Out Successful'
      };

      dispatch('notification/addNotification', notification, { root: true });
      commit('SIGN_OUT');
    }
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    authStatus: state => state.status
  }
};

export default authorizationModule;
