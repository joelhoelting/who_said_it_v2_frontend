<template>
  <transition name="fade">
    <table v-if="gameState.length > 0">
      <tr>
        <th align="left" width="10%">#</th>
        <th align="left" width="40%">Quote</th>
        <th align="left" width="25%">Correct Answer</th>
        <th align="left" width="25%">Your Answer</th>
      </tr>
      <tr v-for="(el, index) in gameState" :key="index" valign="top" class="quote-row">
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
  border-collapse: separate;
  border-spacing: 0 0.6em;
  width: 100%;
  tr {
    td,
    th {
      padding: 0.8em 1em;
    }

    td {
      span {
        &.correct {
          color: $correct-green;
        }
        &.incorrect {
          color: white;
        }
      }
    }

    &.quote-row {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
