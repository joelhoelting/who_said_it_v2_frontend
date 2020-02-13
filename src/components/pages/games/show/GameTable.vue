<template>
  <transition name="fade">
    <table v-if="gameState.length > 0">
      <tr>
        <th align="left">#</th>
        <th align="left">Quote</th>
        <th align="left">Correct Answer</th>
        <th align="left">Your Answer</th>
      </tr>
      <tr v-for="(el, index) in gameState" :key="index" valign="top">
        <td align="left" width="10%">{{ index + 1 }}</td>
        <td align="left" width="40%">{{ el.quote.content }}</td>
        <td align="left" width="25%">{{ el.correct_character.name }}</td>
        <td align="left" width="25%">
          <span :class="isAnswerCorrect(el)">{{ el.selected_character.name }}</span>
        </td>
      </tr>
    </table>
  </transition>
</template>
<script>
export default {
  props: {
    gameState: Array
  },
  methods: {
    isAnswerCorrect(gameStateEl) {
      const { correct_character, selected_character } = gameStateEl;
      return correct_character.id === selected_character.id ? 'correct' : 'incorrect';
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  tr {
    border-bottom: 1px solid #fff;
    th,
    td {
      padding: 15px 20px;
      span {
        &.correct {
          color: $correct-green;
        }
        &.incorrect {
          color: white;
        }
      }
    }
  }
}
</style>
