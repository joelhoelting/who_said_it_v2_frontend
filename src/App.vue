<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <notification-container />
    <loading-overlay v-if="loadingOverlayActive" />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import { mapActions, mapState } from 'vuex';

import Header from '@/components/includes/Header';
import LoadingOverlay from '@/components/includes/Loader/LoadingOverlay';
import NotificationContainer from '@/components/includes/Notification';

export default {
  name: 'App',
  components: {
    Header,
    LoadingOverlay,
    NotificationContainer
  },
  created() {
    if (this.authorization.jwt) {
      this.validateToken();
    }
  },
  computed: {
    ...mapState(['loadingOverlayActive', 'authorization'])
  },
  methods: {
    ...mapActions('authorization', ['validateToken'])
  }
};
</script>
