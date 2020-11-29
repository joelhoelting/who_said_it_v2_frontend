import { authorizedAxiosInstance, plainAxiosInstance } from '@/axios';

const getDefaultState = () => {
  return {
    id: Number,
    difficulty: 'easy',
    characters: [
      {
        id: 5,
        name: 'George Carlin',
        description: 'Stand-up Comedian, renowned cynic. Made the bald ponytail fashionable again.',
        slug: 'george_carlin'
      },
      {
        id: 6,
        name: 'God',
        description: 'Allegedly created the universe in 6 days. Known to get into fits of jealous rage.',
        slug: 'god'
      }
    ],
    characterIds: [],
    currentQuoteIdx: 0,
    quotes: [],
    answer: {
      submitted: false,
      evaluation: Boolean
    },
    gameState: [],
    inProgress: false,
    completed: false
  };
};

const difficultyRules = {
  easy: 2,
  medium: 3,
  hard: 4
};

const characterModule = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    ADD_CHARACTER_TO_GAME(state, character_id) {
      state.characterIds.push(character_id);
    },
    INCREMENT_QUOTE(state) {
      state.currentQuoteIdx++;
    },
    INITIALIZE_GAME(state, gameData) {
      state = Object.assign(state, gameData);
    },
    PUSH_ANSWER_INTO_GAMESTATE(state, answer) {
      state.gameState.push(answer);
    },
    REMOVE_CHARACTER_FROM_GAME(state, character_id) {
      state.characterIds.splice(state.characterIds.indexOf(character_id), 1);
    },
    RESET_CHARACTERS(state) {
      state.characterIds = [];
    },
    RESET_GAME_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    },
    SET_GAME_CHARACTERS(state, characters) {
      state.characters = characters;
    },
    SET_GAME_COMPLETED(state) {
      state.completed = true;
    },
    SET_QUOTES(state, quotes) {
      state.quotes = quotes;
    },
    TOGGLE_ANSWER_SUBMITTED(state) {
      state.answer.submitted = !state.answer.submitted;
    },
    TOGGLE_GAME_IN_PROGRESS(state) {
      state.inProgress = !state.inProgress;
    },
    UPDATE_CURRENT_ANSWER(state, evaluation) {
      state.answer.evaluation = evaluation;
    }
  },
  actions: {
    addOrRemoveCharacterFromGame({ commit, state }, character_id) {
      if (state.characterIds.includes(character_id)) {
        return commit('REMOVE_CHARACTER_FROM_GAME', character_id);
      }

      if (state.characterIds.length < difficultyRules[state.difficulty]) {
        commit('ADD_CHARACTER_TO_GAME', character_id);
      } else {
        console.log('Notification: too many characters');
      }
    },
    createGame({ dispatch, state, rootGetters }) {
      const { characterIds, difficulty } = state;
      const characters = state.characterIds.map(id => rootGetters['character/findCharacterById'](id));

      const isLoggedIn = rootGetters['authorization/isLoggedIn'];
      const axiosInstance = isLoggedIn ? authorizedAxiosInstance : plainAxiosInstance;

      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        axiosInstance
          .post('/games', {
            game: {
              difficulty,
              characters: characterIds
            }
          })
          .then(response => {
            const { id, game_quotes } = response.data;
            console.log(response.data);
            const gameObj = {
              id,
              characters,
              quotes: game_quotes,
              inProgress: true
            };

            dispatch('initializeGame', gameObj);

            setTimeout(() => {
              resolve(response);
              dispatch('disableLoadingAnimation', null, { root: true });
            }, 500);
          })
          .catch(error => {
            setTimeout(() => {
              reject(error);
              dispatch('disableLoadingAnimation', null, { root: true });
              console.error('Notification: Connection Failure: Please check your connection');
            }, 500);
          });
      });
    },
    fetchUserGame({ dispatch }, id) {
      dispatch('enableLoadingUnderlay', null, { root: true });

      return new Promise((resolve, reject) => {
        authorizedAxiosInstance
          .get(`/games/${id}`)
          .then(response => {
            setTimeout(() => {
              resolve(response);
              dispatch('disableLoadingUnderlay', null, { root: true });
            }, 500);
          })
          .catch(error => {
            setTimeout(() => {
              reject(error);
              dispatch('disableLoadingUnderlay', null, { root: true });
              console.error('Notification: Connection Failure: Please check your connection');
            }, 500);
          });
      });
    },
    fetchUserGames({ dispatch }) {
      dispatch('enableLoadingUnderlay', null, { root: true });

      return new Promise((resolve, reject) => {
        authorizedAxiosInstance
          .get('/games')
          .then(response => {
            setTimeout(() => {
              resolve(response);
              dispatch('disableLoadingUnderlay', null, { root: true });
            }, 500);
          })
          .catch(error => {
            setTimeout(() => {
              reject(error);
              dispatch('disableLoadingUnderlay', null, { root: true });
              console.error('Notification: Connection Failure: Please check your connection');
            }, 500);
          });
      });
    },
    incrementQuote({ commit }) {
      commit('INCREMENT_QUOTE');
    },
    initializeGame({ commit }, gameData) {
      commit('INITIALIZE_GAME', gameData);
    },
    pushAnswer({ commit }, answer) {
      const { evaluation } = answer;

      commit('UPDATE_CURRENT_ANSWER', evaluation);
      commit('PUSH_ANSWER_INTO_GAMESTATE', answer);
    },
    resetCharacters({ commit }) {
      commit('RESET_CHARACTERS');
    },
    resetGameState({ commit }) {
      commit('RESET_GAME_STATE');
    },
    setDifficulty({ commit, dispatch, state }, difficulty) {
      if (state.difficulty !== difficulty) {
        dispatch('resetCharacters');
        commit('SET_DIFFICULTY', difficulty);
      }
    },
    setGameCharacters({ commit, state, rootGetters }) {
      const characters = state.characterIds.map(id => rootGetters['character/findCharacterById'](id));
      commit('SET_GAME_CHARACTERS', characters);
    },
    setQuotes({ commit }, quotes) {
      commit('SET_QUOTES', quotes);
    },
    submitAnswer({ dispatch, getters, rootGetters, state }, character) {
      if (state.answer.submitted) return false;

      dispatch('toggleAnswerSubmitted');
      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .patch(`/games/${state.id}`, {
            game: {
              answer: {
                character_id: character.id,
                quote_id: getters.getCurrentQuote.id,
                quote_idx: state.currentQuoteIdx
              }
            }
          })
          .then(response => {
            const { correct_character_id, evaluation } = response.data.state[state.currentQuoteIdx];

            let answerObj = {
              evaluation,
              selected_character: character,
              correct_character: rootGetters['character/findCharacterById'](correct_character_id),
              quote: getters.getCurrentQuote
            };

            dispatch('pushAnswer', answerObj);
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    toggleAnswerSubmitted({ commit }) {
      commit('TOGGLE_ANSWER_SUBMITTED');
    },
    toggleGameInProgress({ commit }) {
      commit('TOGGLE_GAME_IN_PROGRESS');
    },
    triggerNextQuote({ dispatch, state, rootState }) {
      const { loadingAnimationActive } = rootState;
      const {
        answer: { submitted },
        currentQuoteIdx,
        quotes
      } = state;

      // Prevent user from skipping quote if answer is not submitted or evaluation is loading
      if (submitted && !loadingAnimationActive) {
        if (currentQuoteIdx === quotes.length - 1) {
          return dispatch('setGameCompleted');
        }

        dispatch('toggleAnswerSubmitted');
        dispatch('incrementQuote');
      }
    },
    setGameCompleted({ commit }) {
      commit('SET_GAME_COMPLETED');
    }
  },
  getters: {
    charactersRequiredToStartGame: state => {
      const currentCharLength = state.characterIds.length;
      return difficultyRules[state.difficulty] - currentCharLength;
    },
    charactersForSelectedDifficulty: state => {
      return difficultyRules[state.difficulty];
    },
    gameProgressPercentage: state => `${(state.currentQuoteIdx + 1) * 10}%`,
    getCurrentQuote: state => state.quotes[state.currentQuoteIdx],
    getGameScore: state => state.gameState.filter(gameStateEl => gameStateEl.evaluation).length
  }
};

export default characterModule;
