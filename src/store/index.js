import Vue from 'vue';
import Vuex from 'vuex';

import authorization from '@/store/modules/authorization';
import character from '@/store/modules/character';
import game from '@/store/modules/game';
import notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorization,
    character,
    game,
    notification
  },
  state: {
    loadingUnderlayActive: false,
    loadingAnimationActive: false
  },
  mutations: {
    ENABLE_LOADING_UNDERLAY(state) {
      state.loadingUnderlayActive = true;
    },
    DISABLE_LOADING_UNDERLAY(state) {
      state.loadingUnderlayActive = false;
    },
    ENABLE_LOADING_ANIMATION(state) {
      state.loadingAnimationActive = true;
    },
    DISABLE_LOADING_ANIMATION(state) {
      state.loadingAnimationActive = false;
    }
  },
  actions: {
    enableLoadingUnderlay({ commit }) {
      commit('ENABLE_LOADING_UNDERLAY');
    },
    disableLoadingUnderlay({ commit }) {
      commit('DISABLE_LOADING_UNDERLAY');
    },
    enableLoadingAnimation({ commit }) {
      commit('ENABLE_LOADING_ANIMATION');
    },
    disableLoadingAnimation({ commit }) {
      commit('DISABLE_LOADING_ANIMATION');
    }
  }
});
