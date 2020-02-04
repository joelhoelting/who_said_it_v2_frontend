import { plainAxiosInstance } from '@/axios';
import charactersBackup from '@/data/backup/characters';

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
    fetchCharacters({ commit, dispatch, state }) {
      let characterCount = state.characters.length;

      if (characterCount === 0) {
        dispatch('enableLoadingOverlay', null, { root: true });

        return new Promise((resolve, reject) => {
          plainAxiosInstance
            .get('/characters')
            .then(response => {
              let characters = response.data;
              commit('SET_CHARACTERS', characters);

              setTimeout(() => {
                resolve({
                  characters,
                  delay: 0
                });
                dispatch('disableLoadingOverlay', null, { root: true });
              }, 500);
            })
            .catch(error => {
              commit('SET_CHARACTERS', charactersBackup);

              const errorObj = Object.assign(new Error(error), {
                characters: charactersBackup,
                delay: 0
              });

              setTimeout(() => {
                reject(errorObj);
                dispatch('disableLoadingOverlay', null, { root: true });
              }, 500);
            });
        });
      }

      return {
        characters: state.characters,
        delay: 250
      };
    }
  },
  getters: {
    findCharacterById: state => id => state.characters.filter(character => character.id === id)[0]
  }
};

export default characterModule;
