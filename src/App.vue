<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <notification-container />
    <loader v-if="loadingOverlayActive" />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import { mapActions, mapState } from 'vuex';

import Header from '@/components/includes/Header';
import Loader from '@/components/includes/Loader/LoadingOverlay';
import NotificationContainer from '@/components/includes/Notification';

export default {
  name: 'App',
  components: {
    Header,
    Loader,
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
