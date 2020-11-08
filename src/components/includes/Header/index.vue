<template>
  <header>
    <div class="inner-mobile-header mobile">
      <transition name="fade">
        <page-title v-if="currentRouteName">{{ currentRouteName }}</page-title>
      </transition>
      <mobile-hamburger :mobileMenuActive="mobileMenuActive" @toggleMobileMenu="mobileMenuActive = !mobileMenuActive" />
    </div>
    <mobile-navigation
      :mobileMenuActive="mobileMenuActive"
      @closeMobileMenu="closeMobileMenu"
      @signOut="signOut"
      :isLoggedIn="isLoggedIn"
    />
    <nav class="desktop desktop-nav">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/play">Play Game</router-link>
      </div>
      <transition name="fade">
        <page-title v-if="currentRouteName">{{ currentRouteName }}</page-title>
      </transition>
      <div v-if="!isLoggedIn">
        <router-link to="/sign_in">Sign In</router-link>
        <router-link to="/sign_up">Sign Up</router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link to="/account">Account</router-link>
        <router-link to="/games">History</router-link>
        <a href="/sign_out" @click.prevent="signOut">Sign Out</a>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import PageTitle from './PageTitle';
import MobileHamburger from './MobileHamburger';
import MobileNavigation from './MobileNavigation';
import routeTitles from '@/data/routeTitles';

export default {
  name: 'Header',
  components: {
    PageTitle,
    MobileHamburger,
    MobileNavigation
  },
  data() {
    return {
      mobileMenuActive: false
    };
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    currentRouteName() {
      console.log(this.$route.name);
      return routeTitles[this.$route.name];
    }
  },
  methods: {
    closeMobileMenu() {
      if (this.mobileMenuActive) {
        this.mobileMenuActive = false;
      }
    },
    signOut() {
      this.closeMobileMenu();
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
  transition: height 400ms ease;

  @include media-query('tabletLandscape', 'min') {
    height: 100px;
  }

  .inner-mobile-header {
    height: 100%;
    width: 100%;
    display: flex;
    padding-left: 1em;
  }
  .mobile-nav {
    height: 100%;
    width: 100%;
    background: linear-gradient(45deg, #5d37e3 0%, #845df0 100%);
    transform: translateX(100%);
    transition: transform 300ms ease;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &.active {
      transform: translateX(0);
      .mobile-nav__home-logo {
        opacity: 1;
      }
    }
    .mobile-nav__home-logo {
      display: flex;
      align-items: center;
      position: absolute;
      top: 18px;
      left: 20px;
      opacity: 0;
      transition: opacity 300ms ease 150ms;
      img {
        width: 200px;
        z-index: 10;
      }
    }
    .mobile-nav__mobile-section {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 1.4em;
    }
  }

  nav.desktop-nav {
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
