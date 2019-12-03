import { authorizedAxiosInstance, plainAxiosInstance } from '@/axios';

const getDefaultState = () => {
  return {
    difficulty: 'hard',
    characters: [
      {
        description: 'Stand-up comedian, chain smoker and raging misanthropist.',
        id: 2,
        name: 'Bill Hicks',
        slug: 'bill_hicks'
      },
      {
        description: '45th U.S. President. Eats pizza with a fork and knife. Potential harbinger of the apocalypse.',
        id: 3,
        name: 'Donald Trump',
        slug: 'donald_trump'
      },
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
    characterIds: [2, 3, 5, 6],
    currentQuoteIdx: 0,
    quotes: [
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      },
      {
        content:
          'Uranium is big, big stuff because it means the ultimate. The ultimate is called nuclear… It’s called nuclear warming. OK?',
        id: 90
      }
    ],
    answer: {
      submitting: false,
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
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    },
    ADD_CHARACTER_TO_GAME(state, character_id) {
      state.characterIds.push(character_id);
    },
    REMOVE_CHARACTER_FROM_GAME(state, character_id) {
      state.characterIds.splice(state.characterIds.indexOf(character_id), 1);
    },
    RESET_CHARACTERS(state) {
      state.characterIds = [];
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
    TOGGLE_ANSWER_SUBMITTING(state) {
      state.answer.submitting = !state.answer.submitting;
    },
    PUSH_ANSWER_INTO_GAMESTATE(state, answer) {
      state.gameState.push(answer);
    },
    UPDATE_CURRENT_ANSWER(state, evaluation) {
      state.answer.evaluation = evaluation;
    },
    INCREMENT_QUOTE(state) {
      state.currentQuoteIdx++;
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
    incrementQuote({ commit }) {
      commit('INCREMENT_QUOTE');
    },
    toggleAnswerSubmitting({ commit }) {
      commit('TOGGLE_ANSWER_SUBMITTING');
    },
    submitAnswer({ dispatch, getters, rootGetters }, character) {
      dispatch('toggleAnswerSubmitting');
      dispatch('enableLoadingAnimation', null, { root: true });

      return new Promise((resolve, reject) => {
        plainAxiosInstance
          .post('/games/check_answer', {
            answer: {
              character_id: character.id,
              quote_id: getters.getCurrentQuote.id
            }
          })
          .then(response => {
            const { correct_character, evaluation } = response.data;

            let answerObj = {
              selectedCharacter: character,
              correctCharacter: rootGetters['character/findCharacterById'](correct_character.id),
              evaluation,
              quote: getters.getCurrentQuote
            };

            dispatch('pushAnswer', answerObj);
            resolve(response);
            dispatch('disableLoadingAnimation', null, { root: true });
          });
      });
    },
    triggerNextQuote({ commit, dispatch }) {
      dispatch('toggleAnswerSubmitting');
      dispatch('incrementQuote');
    },
    createGame({ commit, dispatch, state, rootGetters }) {
      let { characterIds, difficulty } = state;

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
            const quotes = response.data.game_quotes;
            dispatch('setQuotes', quotes);
            dispatch('setGameCharacters');
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
      const currentCharLength = state.characterIds.length;

      return difficultyRules[state.difficulty] - currentCharLength;
    },
    getCurrentQuote: state => (state.quotes.length > 0 ? state.quotes[state.currentQuoteIdx] : false),
    gameProgressPercentage: state => `${(state.currentQuoteIdx + 1) * 10}%`
  }
};

export default characterModule;
