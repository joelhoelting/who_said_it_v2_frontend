<template>
  <div class="container form-container">
    <form @submit.prevent="signup">
      <label for="email">
        Email Address
        <input type="email" v-model="email" id="email" placeholder="Email Address" />
      </label>
      <label for="password">
        Password
        <input type="password" v-model="password" id="password" placeholder="Password" />
      </label>
      <label for="confirm-password">
        Confirm Password
        <input
          type="password"
          v-model="password_confirmation"
          id="confirm-password"
          placeholder="Confirm Password"
        />
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
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    signup() {
      this.$http.plain
        .post('/signup', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  }
};
</script>
