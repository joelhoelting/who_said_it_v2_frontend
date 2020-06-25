<template>
  <header>
    <nav>
      <div class="desktop">
        <router-link to="/">Home</router-link>
        <router-link to="/play">Play Game</router-link>
      </div>
      <transition name="fade">
        <page-title v-if="currentRouteName">{{ currentRouteName }}</page-title>
      </transition>
      <div v-if="!isLoggedIn" class="desktop">
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div v-if="isLoggedIn" class="desktop">
        <router-link to="/settings">Settings</router-link>
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
      return routeTitles[this.$route.name];
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
  position: absolute;
  height: 60px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  @include media-query('tabletLandscape', 'min') {
    height: 100px;
  }
  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    a {
      margin: 0 0.5em;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    button {
      margin: 0 0.5em;
    }
  }
}
</style>
