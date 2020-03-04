<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signUp">
      <h2 class="form-title">Sign Up</h2>
      <input
        :class="errors.email ? 'error' : ''"
        type="email"
        v-model="email"
        id="email"
        placeholder="Email Address"
      />
      <input
        :class="errors.password ? 'error' : ''"
        type="password"
        v-model="password"
        id="password"
        placeholder="Password"
      />
      <input
        :class="errors.password_confirmation ? 'error' : ''"
        type="password"
        v-model="password_confirmation"
        id="password_confirmation"
        placeholder="Confirm Password"
      />
      <button class="btn" type="submit" value="Submit">Submit</button>
      <div class="auth-options">
        <router-link to="/signin" tag="a">
          <span>Already have an account? Sign In</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { mapGetters } from 'vuex';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'SignUp',
  data() {
    return {
      errors: {
        email: false,
        password: false,
        password_confirmation: false,
        errorsArray: []
      },
      email: 'test@test.com',
      password: 'someThing123$',
      password_confirmation: 'someThing123$'
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
      Vue.use(VueReCaptcha, {
        siteKey: '6LfXd94UAAAAAAEp6hpVvJLYXnPPxHOwBSBCniPS',
        loaderOptions: {
          autoHideBadge: false
        }
      });
    }
  },
  destroyed() {
    this.$recaptchaInstance.hideBadge();
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  },
  methods: {
    async signUp() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "signup".
      const token = await this.$recaptcha('signup');

      let { email, password, password_confirmation } = this;

      if (isValidAuthForm(this, email, password, password_confirmation)) {
        this.$store
          .dispatch('authorization/signUp', {
            auth: {
              email,
              password,
              password_confirmation
            },
            recaptcha: {
              token
            }
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
