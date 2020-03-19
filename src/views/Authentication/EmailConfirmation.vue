<template>
  <div class="container"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EmailConfirmation',
  created() {
    const confirmToken = this.$route.params.token;

    if (this.isLoggedIn) return this.$router.push('/');

    this.$store
      .dispatch('authorization/confirmEmail', {
        confirmToken
      })
      .then(() => {
        this.$router.push('/play');
      })
      .catch(error => {
        const { redirect } = error.response.data;
        this.$router.push(redirect);
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  }
};
</script>

<style></style>
