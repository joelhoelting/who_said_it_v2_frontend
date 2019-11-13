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
        return new Promise((resolve, reject) => {
          plainAxiosInstance
            .get('/characters')
            .then(response => {
              let characters = response.data;
              commit('SET_CHARACTERS', characters);
              resolve(characters);
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

// login({ commit }, user) {
//   return new Promise((resolve, reject) => {
//     commit('auth_request');
//     axios({
//       url: 'http://localhost:3000/login',
//       data: user,
//       method: 'POST'
//     })
//       .then(resp => {
//         const token = resp.data.token;
//         const user = resp.data.user;
//         localStorage.setItem('token', token);
//         // Add the following line:
//         axios.defaults.headers.common['Authorization'] = token;
//         commit('auth_success', token, user);
//         resolve(resp);
//       })
//       .catch(err => {
//         commit('auth_error');
//         localStorage.removeItem('token');
//         reject(err);
//       });
//   });
// },
