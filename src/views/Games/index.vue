<template>
  <div class="container offset-header">
    <table>
      <tr>
        <th align="left" width="30%">Date / Time</th>
        <th align="left" width="30%">Difficulty</th>
        <th align="left" width="30%">Characters</th>
        <th align="left" width="10%">Score</th>
      </tr>
      <tr v-for="(game, index) in userGames" :key="index" valign="top">
        <td align="left">{{game.created_at }}</td>
        <td align="left">{{game.difficulty}}</td>
        <td align="left">{{game.characters}}</td>
        <td align="left">{{getCorrectAnswersMixin(game.state)}} / 10</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import gamesMixin from '@/mixins/games.js';

export default {
  name: 'GamesIndex',
  mixins: [gamesMixin],
  data() {
    return {
      userGames: []
    };
  },
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
  },
  methods: {
    ...mapActions('game', ['getUserGames'])
  }
};
</script>

<style>
</style>
