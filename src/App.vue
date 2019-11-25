<template>
  <div id="app">
    <Header />
    <transition name="fade">
      <router-view />
    </transition>
    <loader v-if="loadingOverlayActive" />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';

import Header from '@/components/includes/Header';
import Loader from '@/components/includes/Loader/LoadingOverlay';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Loader
  },
  computed: {
    ...mapState(['loadingOverlayActive'])
  }
};
</script>
