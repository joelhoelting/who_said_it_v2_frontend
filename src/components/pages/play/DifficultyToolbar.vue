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
  name: 'DifficultyToolbar',
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
  margin: 0 0 1em;
  @include media-query('tablet', 'min') {
    margin: 0 0 2em;
  }
}
</style>
