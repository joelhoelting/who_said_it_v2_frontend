<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signIn">
      <h2 class="form-title">Sign In</h2>
      <input type="email" v-model="email" id="email" placeholder="Email Address" />
      <input type="password" v-model="password" id="password" placeholder="Password" />
      <button class="btn" type="submit" value="Submit">Submit</button>
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

<style lang="scss" scoped></style>
