import { authorizedAxiosInstance, plainAxiosInstance } from '@/axios';

const getDefaultState = () => {
  return {
    difficulty: 'easy',
    characters: [],
    currentQuote: 0,
    quotes: [],
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
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    },
    ADD_CHARACTER_TO_GAME(state, character_id) {
      state.characters.push(character_id);
    },
    REMOVE_CHARACTER_FROM_GAME(state, character_id) {
      state.characters.splice(state.characters.indexOf(character_id), 1);
    },
    RESET_CHARACTERS(state) {
      state.characters = [];
    },
    SET_QUOTES(state, quotes) {
      state.quotes = quotes;
    },
    TOGGLE_GAME_IN_PROGRESS(state) {
      state.inProgress = !state.inProgress;
    }
  },
  actions: {
    addOrRemoveCharacterFromGame({ commit, state }, character_id) {
      if (state.characters.includes(character_id)) {
        return commit('REMOVE_CHARACTER_FROM_GAME', character_id);
      }

      if (state.characters.length < difficultyRules[state.difficulty]) {
        commit('ADD_CHARACTER_TO_GAME', character_id);
      } else {
        console.log('Notification: too many characters');
      }
    },
    setQuotes({ commit }, quotes) {
      commit('SET_QUOTES', quotes);
    },
    toggleGameInProgress({ commit }) {
      commit('TOGGLE_GAME_IN_PROGRESS');
    },
    createGame({ commit, dispatch, state, rootGetters }) {
      let { characters, difficulty } = state;

      const isLoggedIn = rootGetters['authorization/isLoggedIn'];
      const axiosInstance = isLoggedIn ? authorizedAxiosInstance : plainAxiosInstance;

      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        axiosInstance
          .post('/games', {
            characters,
            difficulty
          })
          .then(response => {
            const quotes = response.data.game_quotes;
            dispatch('setQuotes', quotes);
            dispatch('toggleGameInProgress');

            setTimeout(() => {
              resolve(response);
              dispatch('disableLoadingAnimation', null, { root: true });
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
    }
  },
  getters: {
    charactersRequiredToStartGame: state => {
      const currentCharLength = state.characters.length;

      return difficultyRules[state.difficulty] - currentCharLength;
    },
    getCurrentQuote: state => (state.quotes.length > 0 ? state.quotes[state.currentQuote].content : false)
  }
};

export default characterModule;
