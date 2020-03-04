const notificationModule = {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification
      });
    },
    DELETE_NOTIFICATION(state) {
      state.notifications.shift();
    }
  },
  actions: {
    add({ commit, dispatch, state }, notification) {
      if (state.notifications.length === 0) {
        commit('PUSH_NOTIFICATION', notification);

        setTimeout(() => {
          dispatch('remove');
        }, 4000);
      }
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove);
    }
  },
  getters: {}
};

export default notificationModule;
