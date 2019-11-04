import Vue from 'vue';
import Vuex from 'vuex';

import character from '@/store/modules/character.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    character
  },
  state: {},
  mutations: {},
  actions: {}
});
