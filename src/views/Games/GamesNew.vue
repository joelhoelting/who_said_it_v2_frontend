<template>
  <div class="container offset-header">
    <transition name="fade">
      <div class="quote-container" v-if="!game.completed">
        <div class="quote-box">
          <transition name="quote-slow-fade-from-top">
            <p v-for="quote in currentQuote" :key="`game-quote-${quote.id}`" class="quote-box__current_quote">
              "{{ quote.content }}"
            </p>
          </transition>
        </div>
        <div class="quote-progress">
          <p>{{ game.currentQuoteIdx + 1 }}/10</p>
        </div>
      </div>
    </transition>
    <footer-bar
      v-if="!game.completed"
      has-footer-drawer
      :class-prop="'bottom-position-overlay'"
      :footer-drawer-active="game.answer.submitted"
    >
      <div class="footer-container__progress-bar" :style="{ width: gameProgressPercentage }" />
      <template v-slot:footer-drawer>
        <div class="answer-overlay" v-if="game.answer.submitted" @click="triggerNextQuote">
          <loading-animation v-if="loadingAnimationActive" />
          <div class="answer-overlay__answer_box" v-if="!loadingAnimationActive">
            <h6 class="answer-overlay__answer">
              <span v-if="!loadingAnimationActive && game.answer.evaluation" class="answer-overlay__answer--correct"
                >Correct!</span
              >
              <span v-if="!loadingAnimationActive && !game.answer.evaluation" class="answer-overlay__answer--incorrect"
                >Incorrect</span
              >
            </h6>
            <p class="answer-overlay__instructions">CLICK OR PRESS SPACE TO CONTINUE</p>
          </div>
        </div>
      </template>
      <character-game-card
        v-for="(character, index) in game.characters"
        :key="character.id"
        :character="character"
        :characterNumber="index + 1"
        :data-index="index"
      />
    </footer-bar>
    <transition name="fade">
      <div class="postgame-container" v-if="game.completed">
        <transition name="fade">
          <div class="score-container" v-if="!showDetails">
            <p>Your Score: {{ getGameScore }} / 10</p>
            <div class="scoremeter">
              <span class="scoremeter__static" :style="{ width: getGameScore * 10 + '%' }">
                <span class="scoremeter__progress progress"></span>
              </span>
            </div>
            <button class="btn btn--game-details" @click="showDetails = !showDetails">
              <span>View Game Details</span>
            </button>
          </div>
        </transition>
        <transition name="fade">
          <div class="detail-container" v-if="showDetails">
            <game-table :gameState="game.gameState" />
          </div>
        </transition>
      </div>
    </transition>
    <transition name="fade">
      <footer-bar height="200px" v-if="game.completed">
        <router-link class="btn btn--start" to="/play" tag="button">
          <span>Play Again</span>
        </router-link>
      </footer-bar>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import CharacterGameCard from '@/components/pages/games/new/CharacterGameCard';
import GameTable from '@/components/pages/games/show/GameTable';
import FooterBar from '@/components/includes/FooterBar';
import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation';

import { range } from '@/helpers/arrays';

export default {
  name: 'GamesNew',
  components: {
    CharacterGameCard,
    FooterBar,
    GameTable,
    LoadingAnimation
  },
  data() {
    return {
      showDetails: false
    };
  },
  created() {
    if (!this.game.inProgress) {
      this.$router.push('/play');
    }
  },
  mounted() {
    window.addEventListener('keypress', this.handleKeyboardFunctionality);
  },
  destroyed() {
    window.removeEventListener('keypress', this.handleKeyboardFunctionality);
  },
  computed: {
    ...mapState(['game', 'loadingAnimationActive']),
    ...mapGetters('game', ['getCurrentQuote', 'getGameScore', 'gameProgressPercentage']),
    currentQuote() {
      const currentQuoteIdx = this.game.currentQuoteIdx;
      return this.game.quotes.filter((quote, idx) => idx === currentQuoteIdx);
    },
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
  height: calc(100% - 100px);
  @include media-query('tabletLandscape', 'min') {
    height: calc(100% - 150px);
  }
  @include media-query('desktop', 'min') {
    height: calc(100% - 200px);
  }
  .quote-box {
    height: 95%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .quote-box__current_quote {
      position: absolute;
      max-width: 1000px;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      @include media-query('tabletLandscape', 'min') {
        height: calc(100% - 200px);
        padding: 1em;
        font-size: 1.4rem;
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  height: calc(100% - 200px);
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  .score-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    p {
      margin: 0;
      font-size: 1.4rem;
    }
    .scoremeter {
      height: 50px;
      border-radius: 50px;
      position: relative;
      background: $dark-purple;
      margin: 0 auto;
      overflow: hidden;
      width: 75%;
      margin: 1.4em 0;
      span {
        display: block;
        height: 100%;
        &.progress {
          background: $light-purple;
          animation: animateProgressBar 1s ease-in-out;
        }
      }

      @keyframes animateProgressBar {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
    }
  }
  .detail-container {
    position: absolute;
    left: 0;
    top: 100px;
    width: 100%;
  }
}

.footer-container {
  .footer-container__progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: white;
    transition: width 300ms ease;
  }
  .footer-container__footer-drawer {
    &.active {
      z-index: 1 !important;
      bottom: 0 !important;
    }
    .answer-overlay {
      height: calc(100%);
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
            color: $correct-green;
          }
          .answer-overlay__answer--incorrect {
            color: $incorrect-red;
          }
        }
      }
    }
  }
}
</style>
