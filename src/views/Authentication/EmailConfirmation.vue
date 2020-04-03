<template>
  <div class="container"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EmailConfirmation',
  async created() {
    const confirm_token = this.$route.params.token;

    if (this.isLoggedIn) return this.$router.push('/');

    try {
      await this.$store.dispatch('authorization/confirmEmail', {
        confirm_token
      });
      this.$router.push('/play');
    } catch (error) {
      console.log(error.response.data);
      const { redirect } = error.response.data;
      this.$router.push(redirect);
    }
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  }
};
</script>

<style></style>
