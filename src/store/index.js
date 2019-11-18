import Vue from 'vue';
import Vuex from 'vuex';

import authorization from '@/store/modules/authorization.js';
import character from '@/store/modules/character.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorization,
    character
  },
  state: {
    loading: false
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.loading = !state.loading;
    }
  },
  actions: {
    toggleLoading({ commit }) {
      commit('TOGGLE_LOADING');
    }
  }
});
