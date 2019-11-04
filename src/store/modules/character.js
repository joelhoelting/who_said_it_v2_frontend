import { plainAxiosInstance } from '@/axios';

const characterModule = {
  namespaced: true,
  state: {
    characters: []
  },
  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    }
  },
  actions: {
    fetchCharacters({ commit }) {
      plainAxiosInstance
        .get('/characters')
        .then(response => {
          const characters = response.data;
          commit('SET_CHARACTERS', characters);
        })
        .catch(error => console.log('something', error));
    }
  },
  getters: {}
};

export default characterModule;
