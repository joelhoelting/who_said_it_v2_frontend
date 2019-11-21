import Vue from 'vue';
import Vuex from 'vuex';

import authorization from '@/store/modules/authorization.js';
import character from '@/store/modules/character.js';
import game from '@/store/modules/game.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorization,
    character,
    game
  },
  state: {
    loading: false
  },
  mutations: {
    ENABLE_LOADING(state) {
      state.loading = true;
    },
    DISABLE_LOADING(state) {
      state.loading = false;
    }
  },
  actions: {
    enableLoading({ commit }) {
      commit('ENABLE_LOADING');
    },
    disableLoading({ commit }) {
      commit('DISABLE_LOADING');
    }
  }
});
