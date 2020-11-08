<template>
  <div class="container flex-center-container">
    <transition name="fade">
      <form v-if="!loadingUnderlayActive" class="authentication" @submit.prevent="localResetPassword">
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { initializeVueReCaptcha } from '@/helpers/recaptcha';

import { isValidAuthForm } from '@/helpers/validations';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

export default {
  name: 'PasswordReset',
  components: {
    LoadingAnimation
  },
  data() {
    return {
      errors: {
        password: false,
        password_confirmation: false,
        errorsArray: []
      },
      password: 'someThing1234$',
      password_confirmation: 'someThing1234$',
      password_reset_token: ''
    };
  },
  created() {
    if (this.isLoggedIn) return this.$router.push('/');

    const { password_reset_token } = this.$route.params;

    this.isPasswordResetTokenValid({
      password_reset_token
    })
      .then(() => {
        this.password_reset_token = password_reset_token;
        if (this.$recaptchaInstance) {
          this.$recaptchaInstance.showBadge();
        } else {
          initializeVueReCaptcha();
        }
      })
      .catch(() => {
        this.$router.push('/signin');
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
          auth: {
            password,
            password_confirmation,
            password_reset_token
          },
          recaptcha: {
            token
          }
        }).then(() => {
          this.$router.push('/signin');
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
