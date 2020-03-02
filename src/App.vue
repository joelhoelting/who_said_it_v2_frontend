<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <loader v-if="loadingOverlayActive" />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import { mapActions, mapState } from 'vuex';

import Header from '@/components/includes/Header';
import Loader from '@/components/includes/Loader/LoadingOverlay';

export default {
  name: 'App',
  components: {
    Header,
    Loader
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
