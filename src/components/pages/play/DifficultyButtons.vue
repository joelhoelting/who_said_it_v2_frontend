<template>
  <div class="difficulty-container">
    <button
      class="btn btn--difficulty"
      @click="setDifficulty('easy')"
      :class="isButtonSelected('easy')"
    >Easy</button>
    <button
      class="btn btn--difficulty"
      @click="setDifficulty('medium')"
      :class="isButtonSelected('medium')"
    >Medium</button>
    <button
      class="btn btn--difficulty"
      @click="setDifficulty('hard')"
      :class="isButtonSelected('hard')"
    >Hard</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('game', ['difficulty'])
  },
  methods: {
    ...mapActions('game', ['setDifficulty', 'resetState']),
    isButtonSelected(difficulty) {
      return this.difficulty === difficulty ? 'selected' : undefined;
    }
  },
  destroyed() {
    this.resetState();
  }
};
</script>

<style lang="scss" scoped>
.difficulty-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2em 0;
  .btn--difficulty {
    height: 50px;
    width: 200px;
    font-size: 1.4rem;
    margin: 0 0.3em;
    &.selected {
      border: 3px solid white;
    }
  }
}
</style>
