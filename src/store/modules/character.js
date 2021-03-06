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
        dispatch('enableLoadingUnderlay', null, { root: true });

        return new Promise((resolve, reject) => {
          plainAxiosInstance
            .get('/characters')
            .then(response => {
              let characters = response.data;
              commit('SET_CHARACTERS', characters);

              setTimeout(() => {
                dispatch('disableLoadingUnderlay', null, { root: true });
                resolve({
                  characters
                });
              }, 500);
            })
            .catch(error => {
              commit('SET_CHARACTERS', charactersBackup);

              const errorObj = Object.assign(new Error(error), {
                characters: charactersBackup
              });

              setTimeout(() => {
                dispatch('disableLoadingUnderlay', null, { root: true });
                reject(errorObj);
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
