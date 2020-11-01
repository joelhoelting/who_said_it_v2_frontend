<template>
  <div class="answer-overlay" @click="triggerNextQuote">
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
      <p class="answer-overlay__instructions desktop">CLICK HERE OR PRESS SPACE TO CONTINUE</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation';

export default {
  name: 'AnswerOverlay',
  components: {
    LoadingAnimation
  },
  computed: {
    ...mapState(['game', 'loadingAnimationActive'])
  },
  methods: {
    ...mapActions('game', ['triggerNextQuote'])
  }
};
</script>

<style lang="scss" scoped>
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
  z-index: 1;
  .answer-overlay__answer_box {
    text-align: center;
    .answer-overlay__answer {
      margin: 0;
      font-size: 1.6rem;
      @include media-query('tabletLandscape', 'min') {
        font-size: 1.4rem;
      }
      .answer-overlay__answer--correct {
        color: $correct-green;
      }
      .answer-overlay__answer--incorrect {
        color: $incorrect-red;
      }
    }
  }
}
</style>
