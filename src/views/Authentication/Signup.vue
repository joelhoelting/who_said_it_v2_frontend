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
    </form>
  </div>
</template>

<script>
import { isValidEmail, isValidPassword } from '@/helpers/validations';

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
      email: 'email@e',
      password: 'a',
      password_confirmation: 'ad'
    };
  },
  methods: {
    validateForm() {
      this.errorsArray = [];
      // let containsErrors = false;

      let { email, password, password_confirmation } = this;

      console.log(email, password, password_confirmation);
      console.log(!isValidEmail(email));
      console.log(!isValidPassword(password));

      if (!isValidEmail(email)) {
        console.log('invalid email');
        this.errorsArray.push('Email is invalid');
        this.errors.email = true;
      }

      if (!isValidPassword(password)) {
        console.log('invalid password');
        this.errorsArray.push(
          'Password must be at least eight characters (one letter, one number and one special character)'
        );
        this.errors.password = true;
      }

      if (password !== password_confirmation) {
        console.log('passwords do not match');
        this.errorsArray.push('Passwords do not match');
        this.errors.password_confirmation = true;
      }

      // return false;
    },
    signUp() {
      let { email, password, password_confirmation } = this;

      if (this.validateForm()) {
        this.$store
          .dispatch('authorization/signUp', {
            email,
            password,
            password_confirmation
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
