<template>
  <div class="outer-container">
    <div class="container">
      <page-title>Who Said It?</page-title>
      <div class="quote-box">
        <p>"{{getCurrentQuote}}"</p>
      </div>
    </div>
    <footer-bar>
      <character-game-card
        v-for="(character, index) in game.characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </footer-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import CharacterGameCard from '@/components/pages/games/new/CharacterGameCard.vue';
import PageTitle from '@/components/includes/Text/PageTitle';
import FooterBar from '@/components/includes/FooterBar';

export default {
  name: 'GameNew',
  components: {
    CharacterGameCard,
    PageTitle,
    FooterBar
  },
  computed: {
    ...mapState(['game']),
    ...mapGetters('game', ['getCurrentQuote'])
  },
  mounted() {
    // if (!this.game.inProgress) {
    //   this.$router.push('/play');
    // }
  }
};
</script>

<style lang="scss" scoped>
.quote-box {
  height: calc(50% - 200px);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 2rem;
    padding: 1em;
  }
}
</style>>
