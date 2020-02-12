<template>
  <h1>Game Show</h1>
</template>

<script>
import { mapGetters } from 'vuex';

// import GameTable from '@/components/pages/games/show/GameTable';

export default {
  name: 'GamesShow',
  // components: {
  //   GameTable
  // },
  created() {
    if (!this.isLoggedIn) {
      return this.$router.push('/');
    }

    this.getUserGames()
      .then(response => {
        const userGames = response.data;
        this.userGames = userGames;
      })
      .catch(error => {
        console.error(error);
        this.$router.push('/');
      });
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  }
};
</script>

<style>
</style>
