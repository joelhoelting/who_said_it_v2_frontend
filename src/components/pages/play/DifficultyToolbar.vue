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
    ...mapActions('game', ['setDifficulty', 'resetCharacters']),
    isButtonSelected(difficulty) {
      return this.difficulty === difficulty ? 'selected' : undefined;
    }
  }
};
</script>

<style lang="scss" scoped>
.difficulty-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 2em;
  .btn--difficulty {
    height: 50px;
    width: 200px;
    font-size: 1.4rem;
    margin: 0 0.5em;
    transition: border 300ms ease, transform 300ms ease;
    transform: scale(1);
    &.selected {
      border: 3px solid white;
      transform: scale(1.1);
    }
  }
}
</style>
