<template>
  <header>
    <div class="inner-mobile-header mobile">
      <transition name="fade">
        <page-title v-if="currentRouteName">{{ currentRouteName }}</page-title>
      </transition>
      <div class="mobile hamburger-container" @click="mobileMenuActive = !mobileMenuActive">
        <div class="hamburger-container__hamburger" :class="{ active: mobileMenuActive }">
          <span class=""></span>
          <span class=""></span>
          <span class=""></span>
          <span class=""></span>
          <span class=""></span>
          <span class=""></span>
        </div>
      </div>
    </div>
    <nav class="mobile mobile-nav" :class="{ active: mobileMenuActive }">
      <router-link @click.native="closeMobileMenu" class="mobile-nav__home-logo" to="/">
        <img class="mobile-header-logo" :src="require('@/assets/images/logos/who_said_it_logo.svg')" />
      </router-link>
      <div class="mobile-nav__mobile-section">
        <router-link @click.native="closeMobileMenu" to="/">Home</router-link>
        <router-link @click.native="closeMobileMenu" to="/play">Play Game</router-link>
      </div>
      <div class="mobile-nav__mobile-section" v-if="!isLoggedIn">
        <router-link @click.native="closeMobileMenu" to="/signin">Sign In</router-link>
        <router-link @click.native="closeMobileMenu" to="/signup">Sign Up</router-link>
      </div>
      <div class="mobile-nav__mobile-section" v-if="isLoggedIn">
        <router-link @click.native="closeMobileMenu" to="/settings">Settings</router-link>
        <router-link @click.native="closeMobileMenu" to="/games">Statistics</router-link>
        <a href="/signout" @click.prevent="signOut">Sign Out</a>
      </div>
    </nav>
    <nav class="desktop desktop-nav">
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
  data() {
    return {
      mobileMenuActive: false
    };
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn']),
    currentRouteName() {
      return routeTitles[this.$route.name];
    }
  },
  methods: {
    closeMobileMenu() {
      this.mobileMenuActive = false;
    },
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
  transition: height 400ms ease;

  @include media-query('tabletLandscape', 'min') {
    height: 100px;
  }

  .inner-mobile-header {
    height: 100%;
    width: 100%;
    display: flex;
    padding-left: 1em;

    .hamburger-container {
      height: 60px;
      width: 60px;
      position: absolute;
      right: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      .hamburger-container__hamburger {
        z-index: 2;
        width: 40px;
        height: 40px;
        overflow: initial;
        position: relative;
        span {
          display: block;
          position: absolute;
          height: 6px;
          width: 50%;
          background: #ffffff;
          opacity: 1;
          box-shadow: 1px 2px rgba(0, 0, 0, 0.5);
          transform: rotate(0deg);
          transition: all 250ms ease-in-out;
          &:nth-child(2n + 1) {
            border-radius: 9px 0 0 9px;
            left: 0px;
          }
          &:nth-child(2n) {
            border-radius: 0 9px 9px 0;
            left: 50%;
          }
          &:nth-child(1),
          &:nth-child(2) {
            top: 6px;
          }
          &:nth-child(3),
          &:nth-child(4) {
            top: 16px;
          }
          &:nth-child(5),
          &:nth-child(6) {
            top: 26px;
          }
        }
        &.active {
          span {
            box-shadow: none;
            &:nth-child(1) {
              left: 4px;
              top: 12px;
              transform: rotate(45deg);
            }
            &:nth-child(2) {
              left: 16px;
              top: 12px;
              transform: rotate(-45deg);
            }
            &:nth-child(3) {
              left: -50%;
              opacity: 0;
            }
            &:nth-child(4) {
              left: 100%;
              opacity: 0;
            }
            &:nth-child(5) {
              left: 4px;
              top: 24px;
              transform: rotate(-45deg);
            }
            &:nth-child(6) {
              left: 16px;
              top: 24px;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
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
      .mobile-header-logo {
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
