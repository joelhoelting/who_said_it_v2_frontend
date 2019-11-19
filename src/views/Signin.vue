<template>
  <div class="container form-container">
    <form @submit.prevent="signIn">
      <label for="email">
        Email Address
        <input type="email" v-model="email" id="email" placeholder="your@email.com" />
      </label>
      <label for="password">
        Password
        <input type="password" v-model="password" id="password" placeholder="Password" />
      </label>
      <button type="submit" value="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
// import gsap from 'gsap';

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
