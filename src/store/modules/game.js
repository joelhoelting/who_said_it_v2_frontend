// import { plainAxiosInstance } from '@/axios';

const getDefaultState = () => {
  return {
    difficulty: 'easy',
    characters: [],
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
    resetCharacters({ commit }) {
      commit('RESET_CHARACTERS');
    },
    resetGameState({ commit }) {
      commit('RESET_GAME_STATE');
    },
    setDifficulty({ commit, dispatch, state }, difficulty) {
      if (state.difficulty !== difficulty) {
        commit('RESET_CHARACTERS');
        commit('SET_DIFFICULTY', difficulty);
      }
    }
  }
};

export default characterModule;
