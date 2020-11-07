import { authorizedAxiosInstance } from '@/axios';
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
    AUTH_PENDING(state) {
      state.status = 'pending';
    },
    AUTH_SUCCESS_ON_APP_REFRESH(state, payload) {
      const { user } = payload;

      Object.assign(state, {
        status: 'success',
        user
      });
    },
    AUTH_SUCCESS(state, payload) {
      let { jwt, user } = payload;
      console.log(jwt, user);

      localStorage.setItem('jwt', jwt);
      Object.assign(state, {
        jwt,
        status: 'success',
        user
      });
    },
    AUTH_ERROR(state) {
      state.status = 'error';
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

        const { jwt, user } = response.data;
        commit('AUTH_SUCCESS', { jwt, user });
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
    async signIn({ commit, dispatch }, payload) {
      try {
        let response = await authAPIHelper(
          { commit, dispatch },
          {
            apiRoute: 'signin',
            httpMethod: 'post',
            payload,
            loadingAction: 'loadingAnimation',
            loadingDelay: 500
          }
        );

        const { jwt, user } = response.data;
        commit('AUTH_SUCCESS', { jwt, user });
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
    signOut({ commit, dispatch }) {
      const notification = {
        type: 'success',
        message: 'Sign Out Successful'
      };

      dispatch('notification/addNotification', notification, { root: true });
      commit('SIGN_OUT');
    },
    validateToken({ commit }) {
      return new Promise(() => {
        commit('AUTH_REQUEST_PENDING');

        authorizedAxiosInstance
          .get('/validate_token')
          .then(response => {
            const { user } = response.data;
            commit('AUTH_SUCCESS_ON_APP_REFRESH', { user });
          })
          .catch(() => {
            commit('SIGN_OUT');
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
