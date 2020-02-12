<template>
  <div class="container offset-header">
    <table border="0">
      <tr>
        <th align="left" width="30%">Date / Time</th>
        <th align="left" width="30%">Difficulty</th>
        <th align="left" width="30%">Characters</th>
        <th align="left" width="10%">Score</th>
      </tr>
      <router-link
        class="game-row"
        to="/play"
        v-for="(game, gameIdx) in userGames"
        :key="gameIdx"
        tag="tr"
        valign="top"
      >
        <td align="left" valign="middle">{{game.created_at }}</td>
        <td align="left" valign="middle">{{game.difficulty}}</td>
        <td align="left" valign="middle">
          <small-character-card
            v-for="(character, characterIdx) in game.characters"
            :key="characterIdx"
            :character="character"
          />
        </td>
        <td align="left" valign="middle">{{getCorrectAnswersMixin(game.state)}} / 10</td>
      </router-link>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import SmallCharacterCard from '@/components/pages/games/index/SmallCharacterCard';
import gamesMixin from '@/mixins/games.js';

export default {
  name: 'GamesIndex',
  components: {
    SmallCharacterCard
  },
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

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: separate;
  position: absolute;
  left: 0;
  border-spacing: 0 0.6em;
  tr {
    th {
      padding: 0.8em 1.4em;
    }
    td {
      padding: 0.8em 1.4em;
      text-transform: uppercase;
    }
    &.game-row {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.2);
      transition: background 200ms ease;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
