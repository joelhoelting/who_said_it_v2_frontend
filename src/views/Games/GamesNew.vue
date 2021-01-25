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
        <answer-overlay />
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
      <div class="postgame-container" v-if="game.completed && !showDetails">
        <div class="score-container">
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
      </div>
      <transition name="fade">
        <div class="detail-container" v-if="game.completed && showDetails">
          <game-table :gameState="game.gameState" />
        </div>
      </transition>
    </transition>
    <transition name="fade">
      <footer-bar v-if="game.completed">
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
import AnswerOverlay from '@/components/pages/games/new/AnswerOverlay';
import GameTable from '@/components/pages/games/show/GameTable';
import FooterBar from '@/components/includes/FooterBar';

import { range } from '@/helpers/arrays';

export default {
  name: 'GamesNew',
  components: {
    CharacterGameCard,
    AnswerOverlay,
    FooterBar,
    GameTable
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
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 1050) {
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
  }
};
</script>

<style lang="scss" scoped>
.quote-container {
  height: calc(100% - 100px);
  @include media-query('tablet', 'min') {
    height: calc(100% - 140px);
  }
  @include media-query('desktop', 'min') {
    height: calc(100% - 200px);
  }
  .quote-box {
    align-items: center;
    display: flex;
    height: 95%;
    justify-content: center;
    left: 50%;
    margin: 0 auto;
    position: relative;
    transform: translateX(-50%);
    width: 100%;
    .quote-box__current_quote {
      align-items: center;
      display: flex;
      font-size: 1rem;
      justify-content: center;
      max-width: 1000px;
      position: absolute;
      @include media-query('tabletLandscape', 'min') {
        font-size: 1.4rem;
        height: calc(100% - 200px);
        padding: 1em;
      }
    }
  }
  .quote-progress {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    height: 5%;
    text-align: center;
    width: 100%;
    p {
      margin: 0;
    }
  }
}
.postgame-container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: calc(100% - 100px);
  left: 0;
  padding-top: 100px;
  top: 0;
  width: 100%;
  position: absolute;
  .score-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 80%;
    p {
      font-size: 1.4rem;
      margin: 0;
    }
    .scoremeter {
      background: $dark-purple;
      border-radius: 50px;
      height: 50px;
      margin: 1.4em 0;
      overflow: hidden;
      position: relative;
      width: 75%;
      span {
        display: block;
        height: 100%;
        &.progress {
          animation: animateProgressBar 1s ease-in-out;
          background: $light-purple;
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
    left: 0;
    padding-bottom: 80px;
    top: 60px;
    width: 100%;
    position: absolute;
    @include media-query('tablet', 'min') {
      padding-bottom: 120px;
      top: 100px;
    }
  }
}

.footer-container {
  .footer-container__progress-bar {
    background: white;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 300ms ease;
    z-index: 2;
  }
}
</style>
