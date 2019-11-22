<template>
  <div id="app">
    <Header />
    <router-view />
    <Loader v-if="loading" />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';

import Header from '@/components/includes/Header';
import Loader from '@/components/includes/Loader';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Loader
  },
  computed: {
    ...mapState(['loading'])
  }
};
</script>
