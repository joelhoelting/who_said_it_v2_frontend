<template>
  <header>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/play">Play Game</router-link>
      </div>
      <transition name="fade">
        <page-title v-if="currentRouteName">{{ currentRouteName }}</page-title>
      </transition>
      <div v-if="!isLoggedIn">
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link to="/signin">Profile</router-link>
        <router-link to="/games">Statistics</router-link>
        <a href="/signout" @click.prevent="signOut">Sign Out</a>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import PageTitle from './PageTitle';
import routeTitles from '@/data/routeTitles';

export default {
  name: 'Header',
  components: {
    PageTitle
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    currentRouteName() {
      const currentRouteTitle = routeTitles[this.$route.name];
      return currentRouteTitle || false;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('authorization/signOut').then(() => {
        if (this.$route.path !== '/') this.$router.push('/');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  height: 100px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    a {
      margin: 0 0.5em;
    }
    button {
      margin: 0 0.5em;
    }
  }
}
</style>
