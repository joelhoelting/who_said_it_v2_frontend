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
    characterIds: [5, 6],
    currentQuoteIdx: 0,
    quotes: [
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      },
      {
        content: '"He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed."',
        id: 204
      }
    ],
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
    RESET_GAME_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    RESET_CHARACTERS(state) {
      state.characterIds = [];
    },
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    },
    ADD_CHARACTER_TO_GAME(state, character_id) {
      state.characterIds.push(character_id);
    },
    REMOVE_CHARACTER_FROM_GAME(state, character_id) {
      state.characterIds.splice(state.characterIds.indexOf(character_id), 1);
    },
    SET_QUOTES(state, quotes) {
      state.quotes = quotes;
    },
    SET_GAME_CHARACTERS(state, characters) {
      state.characters = characters;
    },
    TOGGLE_GAME_IN_PROGRESS(state) {
      state.inProgress = !state.inProgress;
    },
    UPDATE_CURRENT_ANSWER(state, evaluation) {
      state.answer.evaluation = evaluation;
    },
    PUSH_ANSWER_INTO_GAMESTATE(state, answer) {
      state.gameState.push(answer);
    },
    TOGGLE_ANSWER_SUBMITTED(state) {
      state.answer.submitted = !state.answer.submitted;
    },
    INCREMENT_QUOTE(state) {
      state.currentQuoteIdx++;
    },
    INITIALIZE_GAME(state, gameData) {
      state = Object.assign(state, gameData);
    },
    SET_GAME_COMPLETED(state) {
      state.completed = true;
    }
  },
  actions: {
    setDifficulty({ commit, dispatch, state }, difficulty) {
      if (state.difficulty !== difficulty) {
        dispatch('resetCharacters');
        commit('SET_DIFFICULTY', difficulty);
      }
    },
    resetCharacters({ commit }) {
      commit('RESET_CHARACTERS');
    },
    resetGameState({ commit }) {
      commit('RESET_GAME_STATE');
    },
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
            characters: characterIds,
            difficulty
          })
          .then(response => {
            const { id, game_quotes } = response.data;
            const gameObj = {
              id,
              characters,
              quotes: game_quotes,
              inProgress: true
            };

            dispatch('initializeGame', gameObj);

            setTimeout(() => {
              resolve(response);
              setTimeout(() => {
                dispatch('disableLoadingAnimation', null, { root: true });
              }, 200);
            }, 300);
          })
          .catch(error => {
            setTimeout(() => {
              reject(error);
              dispatch('disableLoadingAnimation', null, { root: true });
              console.log(error, 'Notification: Connection Failure: Please check your connection');
            }, 500);
          });
      });
    },
    initializeGame({ commit }, gameData) {
      commit('INITIALIZE_GAME', gameData);
    },
    setQuotes({ commit }, quotes) {
      commit('SET_QUOTES', quotes);
    },
    setGameCharacters({ commit, state, rootGetters }) {
      const characters = state.characterIds.map(id => rootGetters['character/findCharacterById'](id));
      commit('SET_GAME_CHARACTERS', characters);
    },
    toggleGameInProgress({ commit }) {
      commit('TOGGLE_GAME_IN_PROGRESS');
    },
    pushAnswer({ commit }, answer) {
      const { evaluation } = answer;

      commit('UPDATE_CURRENT_ANSWER', evaluation);
      commit('PUSH_ANSWER_INTO_GAMESTATE', answer);
    },
    submitAnswer({ dispatch, getters, rootGetters, state }, character) {
      if (state.answer.submitted) return false;

      dispatch('toggleAnswerSubmitted');
      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .patch(`/games/${state.id}`, {
            answer: {
              character_id: character.id,
              quote_id: getters.getCurrentQuote.id,
              quote_idx: state.currentQuoteIdx
            }
          })
          .then(response => {
            console.log(response.data);
            const { correct_character, evaluation } = response.data;

            let answerObj = {
              evaluation,
              selectedCharacter: character,
              correctCharacter: rootGetters['character/findCharacterById'](correct_character.id),
              quote: getters.getCurrentQuote
            };

            dispatch('pushAnswer', answerObj);
            dispatch('disableLoadingAnimation', null, { root: true });
            resolve(response);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    toggleAnswerSubmitted({ commit }) {
      commit('TOGGLE_ANSWER_SUBMITTED');
    },
    incrementQuote({ commit }) {
      commit('INCREMENT_QUOTE');
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
    getCurrentQuote: state => (state.quotes.length > 0 ? state.quotes[state.currentQuoteIdx] : false),
    gameProgressPercentage: state => `${(state.currentQuoteIdx + 1) * 10}%`
  }
};

export default characterModule;
