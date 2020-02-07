<template>
  <div class="container offset-header"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GamesIndex',
  mounted() {
    this.getUserGames()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        this.$router.push('/');
      });
  },
  methods: {
    ...mapActions('game', ['getUserGames'])
  }
};
</script>

<style>
</style>
