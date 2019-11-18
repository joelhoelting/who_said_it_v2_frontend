import { plainAxiosInstance } from '@/axios';
import charactersBackup from '@/data/backup/characters';

const characterModule = {
  namespaced: true,
  state: {
    characters: [],
    count: 0
  },
  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    }
  },
  actions: {
    fetchCharacters({ commit, dispatch, state }) {
      let characterCount = state.characters.length;

      if (characterCount === 0) {
        dispatch('toggleLoading', null, { root: true });
        return new Promise((resolve, reject) => {
          plainAxiosInstance
            .get('/characters')
            .then(response => {
              let characters = response.data;
              commit('SET_CHARACTERS', characters);

              resolve(characters);
              dispatch('toggleLoading', null, { root: true });
            })
            .catch(error => {
              commit('SET_CHARACTERS', charactersBackup);
              const errorObj = Object.assign(new Error(error), {
                characters: charactersBackup
              });
              reject(errorObj);
            });
        });
      }

      return state.characters;
    }
  }
};

export default characterModule;
