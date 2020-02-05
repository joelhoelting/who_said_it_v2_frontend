<template>
  <table>
    <tr>
      <th align="left">#</th>
      <th align="left">Quote</th>
      <th align="left">Correct Answer</th>
      <th align="left">Your Answer</th>
    </tr>
    <tr v-for="(el, index) in gameState" :key="index" valign="top">
      <td align="left" width="10%">{{index + 1 }}</td>
      <td align="left" width="40%">{{el.quote.content}}</td>
      <td align="left" width="25%">{{el.correctCharacter.name}}</td>
      <td align="left" width="25%">
        <span :class="isAnswerCorrect(el)">{{el.selectedCharacter.name}}</span>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  props: {
    gameState: Array
  },
  methods: {
    isAnswerCorrect(gameStateEl) {
      const { correctCharacter, selectedCharacter } = gameStateEl;
      return correctCharacter.id === selectedCharacter.id ? 'correct' : 'incorrect';
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  margin: 0 20px;
  th,
  td {
    padding: 10px 20px;
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
</style>
