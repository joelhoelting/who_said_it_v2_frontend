<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signIn">
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
      <button class="btn" type="submit" value="Submit">Submit</button>
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
import { mapGetters } from 'vuex';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'SignIn',
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
    ...mapGetters('authorization', ['isLoggedIn'])
  },
  methods: {
    signIn() {
      let { email, password } = this;

      if (isValidAuthForm(this, email, password)) {
        this.$store
          .dispatch('authorization/signIn', { auth: { email, password } })
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
