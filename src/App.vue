<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import Header from '@/components/includes/Header';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header
  },
  created() {
    this.fetchCharacters();
  },
  methods: mapActions('character', ['fetchCharacters'])
};
</script>
