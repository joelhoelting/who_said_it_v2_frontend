<template>
  <div class="container flex-center-container">
    <!-- <transition name="fade">
      <form class="authentication" @submit.prevent="localResetPassword">
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
    </transition>-->
    <h1>Hello World</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { isValidPassword } from '@/helpers/validations';

export default {
  name: 'PasswordResetConfirmation',
  data() {
    return {
      password: 'someThing123$',
      newPassword: '',
      newPasswordConfirmation: ''
    };
  },
  created() {
    if (this.isLoggedIn) return this.$router.push('/');

    const { token } = this.$route.params;

    this.isPasswordResetTokenValid({
      token
    })
      .then(() => {
        // Do something good
      })
      .catch(error => {
        const { redirect } = error.response.data;
        console.log(redirect);
        this.$router.push(redirect);
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      passwordReset: 'authorization/resetPassword',
      isPasswordResetTokenValid: 'authorization/isPasswordResetTokenValid'
    }),
    async localResetPassword() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "signup".
      const token = await this.$recaptcha('password_reset');

      let { password, newPassword, newPasswordConfirmation } = this;

      if (isValidPassword(password)) {
        this.clearErrors();

        this.resetPassword({
          auth: {
            password,
            newPassword,
            newPasswordConfirmation
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
          message: 'Email address not valid'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
