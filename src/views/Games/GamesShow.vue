<template>
  <div class="container offset-header">
    <game-table :gameState="gameState" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import GameTable from '@/components/pages/games/show/GameTable';

export default {
  name: 'GamesShow',
  components: {
    GameTable
  },
  data() {
    return {
      gameState: []
    };
  },
  created() {
    if (!this.isLoggedIn) {
      return this.$router.push('/');
    }

    this.fetchUserGame(this.$route.params.id)
      .then(response => {
        this.gameState = response.data;
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
    ...mapActions('game', ['fetchUserGame'])
  }
};
</script>

<style lang="scss" scoped></style>
