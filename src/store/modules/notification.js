const notificationModule = {
  namespaced: true,
  state: {
    notifications: [],
    setTimeout: false
  },
  mutations: {
    CLEAR_TIMEOUT(state) {
      if (state.setTimeout) {
        clearTimeout(state.setTimeout);
        state.setTimeout = false;
      }
    },
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    CLEAR_NOTIFICATONS(state) {
      state.notifications.shift();
    }
  },
  actions: {
    add({ commit, dispatch, state }, notification) {
      if (state.notifications.length === 0) {
        commit('PUSH_NOTIFICATION', notification);
        dispatch('clearNotificationsWithDelay');
      } else {
        commit('CLEAR_TIMEOUT');

        dispatch('clearNotifications');
        commit('PUSH_NOTIFICATION', notification);
        dispatch('clearNotificationsWithDelay');
      }
    },
    clearNotifications({ commit }) {
      commit('CLEAR_NOTIFICATONS');
    },
    clearNotificationsWithDelay({ commit, state }) {
      state.setTimeout = setTimeout(() => {
        commit('CLEAR_NOTIFICATONS');
      }, 5000);
    }
  }
};

export default notificationModule;
