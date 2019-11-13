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
    fetchCharacters({ commit, state }) {
      let characterCount = state.characters.length;

      if (characterCount === 0) {
        return plainAxiosInstance
          .get('/characters')
          .then(response => {
            let characters = response.data;
            commit('SET_CHARACTERS', characters);
            return characters;
          })
          .catch(error => {
            commit('SET_CHARACTERS', charactersBackup);
            throw Object.assign(new Error(error), {
              characters: charactersBackup
            });
          });
      }

      return state.characters;
    }
  },
  getters: {
    getCharacterCount: state => state.characters.length
  }
};

export default characterModule;
