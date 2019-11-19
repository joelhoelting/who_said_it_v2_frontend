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

const characterModule = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    }
  },
  actions: {
    resetState({ commit }) {
      commit('RESET_STATE');
    },
    setDifficulty({ commit }, difficulty) {
      commit('SET_DIFFICULTY', difficulty);
    }
  }
};

export default characterModule;
