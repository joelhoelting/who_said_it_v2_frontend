<template>
  <div class="container offset-header">
    <transition name="fade">
      <table border="0" v-if="games.length > 0 && !loadingOverlayActive">
        <tr>
          <th
            align="left"
            :class="{ active: filters.date !== 'neutral' }"
            class="filterable"
            width="30%"
            @click="sortGames('date')"
          >
            Date / Time
            <img
              v-if="filters.date !== 'neutral'"
              class="sort_arrow"
              :src="isFilterArrowActive('date')"
            />
          </th>
          <th
            align="left"
            :class="{ active: filters.difficulty !== 'neutral' }"
            class="filterable"
            width="30%"
            @click="sortGames('difficulty')"
          >
            Difficulty
            <img
              v-if="filters.difficulty !== 'neutral'"
              class="sort_arrow"
              :src="isFilterArrowActive('difficulty')"
            />
          </th>
          <th align="left" width="30%">Characters</th>
          <th
            align="left"
            :class="{ active: filters.score !== 'neutral' }"
            class="filterable"
            width="10%"
            @click="sortGames('score')"
          >
            Score
            <img
              v-if="filters.score !== 'neutral'"
              class="sort_arrow"
              :src="isFilterArrowActive('score')"
            />
          </th>
        </tr>
        <router-link
          class="game-row"
          v-for="(game, gameIdx) in games"
          :to="{ name: 'GamesShow', params: { id: game.id } }"
          :key="gameIdx"
          tag="tr"
          valign="top"
        >
          <td align="left" valign="middle" width="30%">{{ parseDateMixin(game.created_at) }}</td>
          <td align="left" valign="middle" width="30%">{{ game.difficulty }}</td>
          <td align="left" valign="middle" width="30%">
            <small-character-card
              v-for="(character, characterIdx) in game.characters"
              :key="characterIdx"
              :character="character"
            />
          </td>
          <td align="left" valign="middle" width="10%">{{ getCorrectAnswersMixin(game.state) }} / 10</td>
        </router-link>
      </table>
    </transition>
    <transition name="fade">
      <div class="empty-games" v-if="games.length === 0 && !loadingOverlayActive">
        <p>You have no games</p>
        <router-link class="btn btn--empty-game" to="/play" tag="button">Play Game</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import { sortGamesByProperty, updateFilters } from '@/helpers/games';

import gamesMixin from '@/mixins/games';
import datesMixin from '@/mixins/dates.js';

import SmallCharacterCard from '@/components/pages/games/index/CharacterSmallCard.vue';

export default {
  name: 'GamesIndex',
  components: {
    SmallCharacterCard
  },
  mixins: [gamesMixin, datesMixin],
  data() {
    return {
      games: [],
      filters: {
        date: 'desc',
        difficulty: 'neutral',
        score: 'neutral'
      }
    };
  },
  created() {
    if (!this.isLoggedIn) {
      return this.$router.push('/');
    }

    this.fetchUserGames()
      .then(response => {
        this.games = sortGamesByProperty('date', 'desc', response.data);
      })
      .catch(error => {
        console.error(error);
        this.$router.push('/');
      });
  },
  computed: {
    ...mapState(['loadingOverlayActive']),
    ...mapGetters('authorization', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('game', ['fetchUserGames']),
    sortGames(filterArg) {
      let { filters, direction } = updateFilters(filterArg, this.filters);
      let games = sortGamesByProperty(filterArg, direction, this.games);

      this.setState({ filters, games });
    },
    isFilterArrowActive(filterProp) {
      let filterState = this.filters[filterProp];

      if (filterState === 'neutral') return false;

      return require(`@/assets/images/icons/${filterState}_arrow.png`);
    },
    setState(obj) {
      Object.assign(this, obj);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 0 0.6em;
  margin-bottom: 5em;
  width: 100%;
  tr {
    td,
    th {
      padding: 0.8em 1em;
      text-transform: uppercase;
    }

    th {
      &.active {
        border: 1px solid white;
      }
      &.filterable {
        text-decoration: underline;
        cursor: pointer;
        position: relative;
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
      .sort_arrow {
        position: absolute;
        right: 10px;
        height: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &.game-row {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: background 200ms ease;
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

.empty-games {
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 100px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 1.2rem;
  }
}
</style>
