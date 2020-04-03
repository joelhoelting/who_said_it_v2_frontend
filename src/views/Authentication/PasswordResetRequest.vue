<template>
  <div class="container flex-center-container">
    <transition name="fade">
      <form class="authentication" @submit.prevent="localRequestPasswordReset">
        <h2 class="form-title">Reset Password</h2>
        <input
          :class="errors.email ? 'error' : ''"
          type="email"
          v-model="email"
          id="email"
          placeholder="Email Address"
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

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

import { isValidEmail } from '@/helpers/validations';

export default {
  name: 'PasswordReset',
  components: {
    LoadingAnimation
  },
  data() {
    return {
      errors: {
        email: false,
        errorsArray: []
      },
      email: 'test@test.com',
      passwordReset: {
        sent: false,
        email: ''
      }
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/');
    }

    // Run recaptcha script on signup page
    if (this.$recaptchaInstance) {
      this.$recaptchaInstance.showBadge();
    } else {
      initializeVueReCaptcha();
    }
  },
  destroyed() {
    this.$recaptchaInstance.hideBadge();
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    ...mapState(['loadingAnimationActive'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      requestPasswordReset: 'authorization/requestPasswordReset'
    }),
    clearErrors() {
      this.errors = {
        email: false,
        errorsArray: []
      };
    },
    async localRequestPasswordReset() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "signup".
      const token = await this.$recaptcha('request_password_reset');

      let { email } = this;

      if (isValidEmail(email)) {
        this.clearErrors();

        this.requestPasswordReset({
          auth: {
            email
          },
          recaptcha: {
            token
          }
        });
      } else {
        this.addNotification({
          type: 'error',
          message: 'Email address not valid'
        });
      }
    },
    toggleEmailConfirmationMsg() {
      this.emailConfirmation.sent = !this.emailConfirmation.sent;
    }
  }
};
</script>

<style lang="scss" scoped></style>
