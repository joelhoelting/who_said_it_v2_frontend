<template>
  <header>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/play">Play Game</router-link>
      </div>
      <transition name="fade">
        <h1 v-if="currentRouteName" class="page-title milkshake center">{{currentRouteName}}</h1>
      </transition>
      <div v-if="!isLoggedIn">
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link to="/signin">Profile</router-link>
        <router-link to="/signup">Statistics</router-link>
        <a href="/signout" @click.prevent="signOut">Sign Out</a>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import routeTitles from '@/data/routeTitles';

export default {
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    currentRouteName() {
      const currentRouteTitle = routeTitles[this.$route.name];
      return currentRouteTitle || undefined;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('authorization/signOut').then(() => {
        this.$router.push('/');
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
    .page-title {
      font-size: 3rem;
      margin: 0;
    }
  }
}
</style>
