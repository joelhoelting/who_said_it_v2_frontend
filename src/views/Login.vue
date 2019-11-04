<template>
  <div class="container form-container">
    <form @submit.prevent="login">
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
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$http.plain
        .post('/signin', { email: this.email, password: this.password })
        .then(response => this.signInSuccessful(response))
        .catch(error => this.signInFailed(error));
    },
    signInSuccessful(response) {
      localStorage.jwt = response.data.jwt;
      localStorage.signedIn = true;
    }
  }
};
</script>
