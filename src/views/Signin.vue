<template>
  <div class="container form-container">
    <form @submit.prevent="signin">
      <label for="email">
        Email Address
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="your@email.com"
        />
      </label>
      <label for="password">
        Password
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Password"
        />
      </label>
      <button type="submit" value="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
// import gsap from 'gsap';

export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signin() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch('authorization/signin', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  }
};
</script>
