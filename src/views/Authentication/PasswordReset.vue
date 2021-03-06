<template>
  <recaptcha-wrapper>
    <div class="container flex-center-container">
      <transition name="fade">
        <form
          v-if="!loadingUnderlayActive && passwordResetTokenValid"
          class="authentication"
          @submit.prevent="localResetPassword"
        >
          <h2 class="form-title">Reset Password</h2>
          <input
            :class="errors.password ? 'error' : ''"
            type="password"
            v-model="password"
            id="email"
            placeholder="New Password"
          />
          <input
            :class="errors.password_confirmation ? 'error' : ''"
            type="password"
            v-model="password_confirmation"
            id="email"
            placeholder="Confirm New Password"
          />
          <button
            class="btn"
            :class="{ disabled: loadingAnimationActive }"
            :disabled="loadingAnimationActive"
            type="submit"
            value="Submit"
          >
            <span v-if="!loadingAnimationActive">Submit</span>
            <loading-animation v-if="loadingAnimationActive" />
          </button>
        </form>
      </transition>
    </div>
  </recaptcha-wrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import RecaptchaWrapper from '@/components/hoc/RecaptchaWrapper';

import { setState } from '@/helpers/state';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'PasswordReset',
  components: {
    LoadingAnimation,
    RecaptchaWrapper
  },
  data() {
    return {
      errors: {
        password: false,
        password_confirmation: false,
        errorsArray: []
      },
      password: '',
      password_confirmation: '',
      password_reset_token: '',
      passwordResetTokenValid: false
    };
  },
  created() {
    if (this.isLoggedIn) return this.$router.push('/play');

    const { password_reset_token } = this.$route.params;

    this.isPasswordResetTokenValid({
      password_reset_token
    })
      .then(() => {
        setState(this, { password_reset_token, passwordResetTokenValid: true });
      })
      .catch(() => {
        this.$router.push('/sign_in');
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    ...mapState(['loadingAnimationActive', 'loadingUnderlayActive'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      resetPassword: 'authorization/resetPassword',
      isPasswordResetTokenValid: 'authorization/isPasswordResetTokenValid'
    }),
    clearErrors() {
      this.errors = {
        password: false,
        password_confirmation: false,
        errorsArray: []
      };
    },
    async localResetPassword() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "reset_password".
      const token = await this.$recaptcha('reset_password');

      let { password, password_confirmation, password_reset_token } = this;

      if (isValidAuthForm(this, { password, password_confirmation })) {
        this.clearErrors();

        this.resetPassword({
          user: {
            password,
            password_confirmation,
            password_reset_token
          },
          recaptcha: {
            token
          }
        }).then(() => {
          this.$router.push('/sign_in');
        });
      } else {
        this.addNotification({
          type: 'error',
          message: this.errors.errorsArray[0]
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
