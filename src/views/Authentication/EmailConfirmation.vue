<template>
  <div></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EmailConfirmation',
  async created() {
    const email_confirmation_token = this.$route.params.token;

    if (this.isLoggedIn) return this.$router.push('/');

    this.confirmEmail({ user: { email_confirmation_token } })
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
  },
  methods: {
    ...mapActions('authorization', ['confirmEmail'])
  }
};
</script>

<style></style>
