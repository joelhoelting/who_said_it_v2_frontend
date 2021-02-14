<template>
  <recaptcha-wrapper>
    <div class="container flex-center-container">
      <transition name="fade">
        <form class="authentication" @submit.prevent="localSignUp" v-if="!emailConfirmation.sent">
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
          <div class="auth-options">
            <router-link to="/sign_in" tag="a">
              <span>Already have an account? Sign In</span>
            </router-link>
          </div>
        </form>
        <email-confirmation-modal :email="emailConfirmation.email" v-else />
      </transition>
    </div>
  </recaptcha-wrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import RecaptchaWrapper from '@/components/hoc/RecaptchaWrapper';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';
import EmailConfirmationModal from '@/components/includes/EmailConfirmationModal';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'SignUp',
  components: {
    LoadingAnimation,
    EmailConfirmationModal,
    RecaptchaWrapper
  },
  data() {
    return {
      errors: {
        email: false,
        password: false,
        password_confirmation: false,
        errorsArray: []
      },
      email: '',
      password: '',
      password_confirmation: 'someThing123$',
      emailConfirmation: {
        sent: false,
        email: ''
      }
    };
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    ...mapState(['loadingUnderlayActive', 'loadingAnimationActive'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      signUp: 'authorization/signUp'
    }),
    clearErrors() {
      this.errors = {
        email: false,
        password: false,
        password_confirmation: false,
        errorsArray: []
      };
    },
    async localSignUp() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "signup".
      const token = await this.$recaptcha('sign_up');

      let { email, password, password_confirmation } = this;

      if (isValidAuthForm(this, { email, password, password_confirmation })) {
        this.clearErrors();

        this.signUp({
          user: {
            email,
            password,
            password_confirmation
          },
          recaptcha: {
            token
          }
        })
          .then(() => {
            this.emailConfirmation.sent = true;
            this.emailConfirmation.email = email;
          })
          .catch(error => console.error(error));
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
