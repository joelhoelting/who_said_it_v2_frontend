<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <notification-container />
    <transition name="fade">
      <loading-underlay v-if="loadingUnderlayActive" />
    </transition>
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import { mapActions, mapState } from 'vuex';

import Header from '@/components/includes/Header';
import LoadingUnderlay from '@/components/includes/Loader/LoadingUnderlay';
import NotificationContainer from '@/components/includes/Notification';

export default {
  name: 'App',
  components: {
    Header,
    LoadingUnderlay,
    NotificationContainer
  },
  created() {
    if (this.authorization.jwt) {
      this.validateToken();
    }
  },
  computed: {
    ...mapState(['loadingUnderlayActive', 'authorization'])
  },
  methods: {
    ...mapActions('authorization', ['validateToken'])
  }
};
</script>
