<template>
  <div class="outer-container">
    <div class="container">
      <page-title>Who Said It?</page-title>
      <transition name="fade">
        <div class="quote-container">
          <div class="quote-box">
            <transition name="quote-slow-fade-from-top">
              <p
                v-for="(quote, idx) in game.quotes"
                :key="`game-quote-${idx}`"
                class="quote-box__current_quote"
                v-if="game.currentQuoteIdx === idx"
              >"{{ quote.content }}"</p>
            </transition>
          </div>
          <div class="quote-progress">
            <p>{{ game.currentQuoteIdx + 1 }}/10</p>
          </div>
        </div>
      </transition>
      <game-footer-bar>
        <character-game-card
          v-for="(character, index) in game.characters"
          :key="character.id"
          :character="character"
          :characterNumber="index + 1"
          :data-index="index"
        />
        <transition name="fade">
          <div class="answer-overlay" v-if="game.answer.submitted" @click="triggerNextQuote">
            <loading-animation v-if="loadingAnimationActive" />
            <transition name="fade">
              <div class="answer-overlay__answer_box" v-if="! loadingAnimationActive">
                <h6 class="answer-overlay__answer">
                  <span
                    v-if="!loadingAnimationActive && game.answer.evaluation"
                    class="answer-overlay__answer--correct"
                  >Correct!</span>
                  <span
                    v-if="!loadingAnimationActive && !game.answer.evaluation"
                    class="answer-overlay__answer--incorrect"
                  >Incorrect</span>
                </h6>
                <p class="answer-overlay__instructions">CLICK OR PRESS SPACE TO CONTINUE</p>
              </div>
            </transition>
          </div>
        </transition>
      </game-footer-bar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import CharacterGameCard from '@/components/pages/games/new/CharacterGameCard.vue';
import PageTitle from '@/components/includes/Text/PageTitle';
import GameFooterBar from '@/components/includes/FooterBar/GameFooterBar';
import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

import { range } from '@/helpers/arrays';

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
  },
  created() {
    window.addEventListener('keypress', this.handleKeyboardFunctionality);
  },
  destroyed() {
    window.removeEventListener('keypress', this.handleKeyboardFunctionality);
  },
  computed: {
    ...mapState(['game', 'loadingAnimationActive']),
    ...mapGetters('game', ['getCurrentQuote']),
    possibleKeyPressValues() {
      return range(1, this.game.characters.length);
    }
  },
  methods: {
    ...mapActions('game', ['triggerNextQuote', 'submitAnswer']),
    handleKeyboardFunctionality(e) {
      let spacebarPressed = e.keyCode === 32;
      let numberPressed = parseInt(String.fromCharCode(e.keyCode));

      const {
        characters,
        answer: { submitted }
      } = this.game;

      // Use numbers on keyboard to select characters
      if (!submitted && this.possibleKeyPressValues.includes(numberPressed)) {
        let selectedCharacterIdx = numberPressed - 1;
        this.submitAnswer(characters[selectedCharacterIdx]);
      }

      // Use spacebar to continue to next question
      if (submitted && spacebarPressed) {
        this.triggerNextQuote();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.quote-container {
  height: calc(100% - 400px);
  .quote-box {
    height: 95%;
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .quote-box__current_quote {
      position: absolute;
      max-width: 1000px;
      font-size: 2rem;
      padding: 1em;
    }
  }
  .quote-progress {
    height: 5%;
    bottom: 0;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0;
    }
  }
}
.postgame-container {
  padding-top: 100px;
  height: calc(100% - 300px);
  position: absolute;
  top: 0;
  background: grey;
  width: 100%;
  left: 0;
}
.footer-container {
  .answer-overlay {
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
    .spinner {
      position: absolute;
    }
    .answer-overlay__answer_box {
      text-align: center;
      .answer-overlay__answer {
        font-size: 4em;
        margin: 0;
        .answer-overlay__answer--correct {
          color: #57ea34;
        }
        .answer-overlay__answer--incorrect {
          color: #ff0000;
        }
      }
    }
  }
}
</style>
