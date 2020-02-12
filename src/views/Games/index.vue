<template>
  <div class="container offset-header"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'GamesIndex',
  created() {
    if (!this.isLoggedIn) {
      return this.$router.push('/');
    }

    this.getUserGames()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        this.$router.push('/');
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('game', ['getUserGames'])
  }
};
</script>

<style>
</style>
