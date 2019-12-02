<template>
  <div class="outer-container">
    <div class="container">
      <page-title>Who Said It?</page-title>
      <div class="quote-box">
        <p class="quote-box__current_quote">"{{getCurrentQuote}}"</p>
      </div>
      <div class="quote-progress">
        <p>1/10</p>
      </div>
    </div>
    <game-footer-bar>
      <character-game-card
        v-for="(character, index) in game.characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </game-footer-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import CharacterGameCard from '@/components/pages/games/new/CharacterGameCard.vue';
import PageTitle from '@/components/includes/Text/PageTitle';
import GameFooterBar from '@/components/includes/FooterBar/GameFooterBar';

export default {
  name: 'GameNew',
  components: {
    CharacterGameCard,
    PageTitle,
    GameFooterBar
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
  height: calc(100% - 450px);
  background: grey;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .quote-box__current_quote {
    font-size: 2rem;
    padding: 1em;
  }
}
.quote-progress {
  bottom: 0;
  width: 100%;
  // background: navy;
  text-align: center;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
  }
}
</style>>
