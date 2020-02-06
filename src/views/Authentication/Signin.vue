<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signIn">
      <h2 class="form-title">Sign In</h2>
      <!-- <label class="visually-hidden" for="email">Email Address</label> -->
      <input type="email" v-model="email" id="email" placeholder="Email Address" />
      <!-- <label class="visually-hidden" for="password">Password</label> -->
      <input type="password" v-model="password" id="password" placeholder="Password" />
      <button class="btn" type="submit" value="Submit">Submit</button>
      <div class="auth-options">
        <router-link to="/password_reset" tag="a">
          <span>Forgot Password?</span>
        </router-link>
        <router-link to="/signup" tag="a">
          <span>Don't have an account? Sign Up now</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signIn() {
      let { email, password } = this;

      this.$store
        .dispatch('authorization/signIn', { email, password })
        // .then(() => this.$router.push('/'))
        .then(() => console.log('push router'))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-options {
  margin-top: 20px;
  a {
    margin: 5px 0;
    display: block;
    span {
      font-family: 'Lato';
      display: block;
      text-align: center;
    }
  }
}
</style>
