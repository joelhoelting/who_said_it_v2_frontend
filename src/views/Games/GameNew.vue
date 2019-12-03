<template>
  <div class="outer-container">
    <div class="container">
      <page-title>Who Said It?</page-title>
      <div class="quote-box">
        <p class="quote-box__current_quote">"{{getCurrentQuote.content}}"</p>
      </div>
      <div class="quote-progress">
        <p>{{game.currentQuoteIdx + 1}}/10</p>
      </div>
    </div>
    <game-footer-bar>
      <character-game-card
        v-for="(character, index) in game.characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
      <transition name="fade">
        <div class="spinner-overlay" v-if="game.answer.submitting" @click="triggerNextQuote">
          <loading-animation v-if="loadingAnimationActive" />
          <h6 class="answer">
            <span
              v-if="!loadingAnimationActive && game.answer.evaluation"
              class="answer--correct"
            >Correct!</span>
            <span
              v-if="!loadingAnimationActive && !game.answer.evaluation"
              class="answer--incorrect"
            >Incorrect</span>
          </h6>
        </div>
      </transition>
    </game-footer-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import CharacterGameCard from '@/components/pages/games/new/CharacterGameCard.vue';
import PageTitle from '@/components/includes/Text/PageTitle';
import GameFooterBar from '@/components/includes/FooterBar/GameFooterBar';
import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

export default {
  name: 'GameNew',
  components: {
    CharacterGameCard,
    PageTitle,
    GameFooterBar,
    LoadingAnimation
  },
  mounted() {
    // if (!this.game.inProgress) {
    //   this.$router.push('/play');
    // }
    this.$store.dispatch('character/fetchCharacters');
  },
  computed: {
    ...mapState(['game', 'loadingAnimationActive']),
    ...mapGetters('game', ['getCurrentQuote'])
  },
  methods: {
    ...mapActions('game', ['triggerNextQuote'])
  }
};
</script>

<style lang="scss" scoped>
.quote-box {
  height: calc(100% - 450px);
  // background: grey;
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
  text-align: center;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
  }
}
.footer-container {
  .spinner-overlay {
    position: absolute;
    height: calc(100% - 2px);
    width: 100%;
    left: 0;
    top: 2px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .answer {
      font-size: 4em;
      .answer--correct {
        color: #57ea34;
      }
      .answer--incorrect {
        color: #ff0000;
      }
    }
  }
}
</style>>
