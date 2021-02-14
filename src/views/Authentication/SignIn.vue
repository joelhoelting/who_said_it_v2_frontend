<template>
  <recaptcha-wrapper>
    <div class="container flex-center-container">
      <transition name="fade">
        <form class="authentication" @submit.prevent="localSignIn" v-if="!emailConfirmation.sent">
          <h2 class="form-title">Sign In</h2>
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
            <router-link to="/password_reset" tag="a">
              <span>Forgot Password?</span>
            </router-link>
            <br />
            <router-link to="/signup" tag="a">
              <span>Don't have an account? Sign Up now</span>
            </router-link>
          </div>
        </form>
        <email-confirmation-modal :email="emailConfirmation.email" v-else>
          <p @click="toggleEmailConfirmationMsg" class="link">Email already confirmed? Sign in</p>
        </email-confirmation-modal>
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
  name: 'SignIn',
  components: {
    LoadingAnimation,
    EmailConfirmationModal,
    RecaptchaWrapper
  },
  props: {
    data: String,
    status: Object
  },
  data() {
    return {
      errors: {
        email: false,
        password: false,
        errorsArray: []
      },
      email: '',
      password: '',
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
      signIn: 'authorization/signIn'
    }),
    clearErrors() {
      this.errors = {
        email: false,
        password: false,
        errorsArray: []
      };
    },
    async localSignIn() {
      // Comes from RecaptchaComponent
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "sign_in".
      const token = await this.$recaptcha('sign_in');

      let { email, password } = this;

      if (isValidAuthForm(this, { email, password })) {
        this.signIn({
          user: {
            email,
            password
          },
          recaptcha: {
            token
          }
        })
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            // If email address not confirmed then show email confirmation modal
            if (error.response.status === 403) {
              this.emailConfirmation.sent = true;
              this.emailConfirmation.email = email;
            }
          });
      } else {
        this.addNotification({
          type: 'error',
          message: this.errors.errorsArray[0]
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
