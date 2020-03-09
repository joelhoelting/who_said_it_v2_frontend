<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signInLocal">
      <h2 class="form-title">Sign In</h2>
      <!-- <label class="visually-hidden" for="email">Email Address</label> -->
      <input
        :class="errors.email ? 'error' : ''"
        type="email"
        v-model="email"
        id="email"
        placeholder="Email Address"
      />
      <!-- <label class="visually-hidden" for="password">Password</label> -->
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';
import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'SignIn',
  components: {
    LoadingAnimation
  },
  data() {
    return {
      errors: {
        email: false,
        password: false,
        errorsArray: []
      },
      email: 'test@test.com',
      password: 'someThing123$'
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    ...mapState(['loadingOverlayActive', 'loadingAnimationActive'])
  },
  methods: {
    ...mapActions('authorization', ['signIn']),
    signInLocal() {
      let { email, password } = this;

      if (isValidAuthForm(this, email, password)) {
        this.signIn({ auth: { email, password } })
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => console.log(err));
      } else {
        this.$store.dispatch('notification/add', {
          type: 'error',
          message: this.errors.errorsArray[0]
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
