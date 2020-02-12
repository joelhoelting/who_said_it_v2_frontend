const games = {
  methods: {
    getCorrectAnswersMixin(gameState) {
      return gameState.filter(gameStateEl => gameStateEl.evaluation).length;
    }
  }
};

export default games;
