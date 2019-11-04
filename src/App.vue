<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import './assets/stylesheets/main.scss';
import Header from '@/components/includes/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>
