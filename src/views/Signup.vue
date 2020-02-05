<template>
  <div class="container flex-center-container">
    <form class="authentication" @submit.prevent="signUp">
      <h2 class="form-title">Sign Up</h2>
      <input type="email" v-model="email" id="email" placeholder="Email Address" />
      <input type="password" v-model="password" id="password" placeholder="Password" />
      <input type="password" v-model="confirm_password" id="confirm_password" placeholder="Confirm Password" />
      <button class="btn" type="submit" value="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    signUp() {
      let { email, password, password_confirmation } = this;

      this.$store
        .dispatch('authorization/signUp', {
          email,
          password,
          password_confirmation
        })
        // .then(() => this.$router.push('/'))
        .then(() => console.log('push router'))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss" scoped></style>
