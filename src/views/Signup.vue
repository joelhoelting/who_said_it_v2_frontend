<template>
  <div class="container form-container">
    <form @submit.prevent="signUp">
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
          id="password_confirmation"
          placeholder="Confirm Password"
        />
      </label>
      <button type="submit" value="Submit">Submit</button>
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
