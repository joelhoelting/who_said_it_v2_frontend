<template>
  <div class="container flex-center-container">
    <transition name="fade">
      <form
        v-if="!loadingOverlayActive"
        class="authentication"
        @submit.prevent="localResetPassword"
      >
        <h2 class="form-title">Reset Password</h2>
        <input
          :class="errors.password ? 'error' : ''"
          type="password"
          v-model="password"
          id="email"
          placeholder="Current Password"
        />
        <input
          :class="errors.new_password ? 'error' : ''"
          type="password"
          v-model="new_password"
          id="email"
          placeholder="New Password"
        />
        <input
          :class="errors.new_password_confirmation ? 'error' : ''"
          type="password"
          v-model="new_password_confirmation"
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

import { isValidPasswordResetForm } from '@/helpers/validations';

export default {
  name: 'PasswordResetConfirmation',
  data() {
    return {
      errors: {
        password: false,
        new_password: false,
        new_password_confirmation: false,
        errorsArray: []
      },
      password: 'someThing123$',
      new_password: '',
      new_password_confirmation: ''
    };
  },
  created() {
    if (this.isLoggedIn) return this.$router.push('/');

    const { token } = this.$route.params;

    this.isPasswordResetTokenValid({
      token
    })
      .then(() => {
        // Run recaptcha script on signup page
        if (this.$recaptchaInstance) {
          this.$recaptchaInstance.showBadge();
        } else {
          initializeVueReCaptcha();
        }
      })
      .catch(error => {
        console.log('trigger');
        const { redirect } = error.response.data;
        this.$router.push(redirect);
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    ...mapState(['loadingAnimationActive', 'loadingOverlayActive'])
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
        new_password: false,
        new_password_confirmation: false,
        errorsArray: []
      };
    },
    async localResetPassword() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "signup".
      const token = await this.$recaptcha('password_reset');

      let { password, new_password, new_password_confirmation } = this;

      if (isValidPasswordResetForm(this, password, new_password, new_password_confirmation)) {
        this.clearErrors();

        this.resetPassword({
          auth: {
            password,
            new_password,
            new_password_confirmation
          },
          recaptcha: {
            token
          }
        }).then(() => {
          // this.$router.push('/');
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

<style lang="scss" scoped>
</style>
