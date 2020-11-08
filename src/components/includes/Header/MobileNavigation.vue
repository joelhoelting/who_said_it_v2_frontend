<template>
  <nav class="mobile mobile-nav" :class="{ active: mobileMenuActive }">
    <router-link @click.native="closeMobileMenuParent" class="mobile-nav__home-logo" to="/">
      <img :src="require('@/assets/images/logos/who_said_it_logo.svg')" />
    </router-link>
    <div class="mobile-nav__mobile-section">
      <router-link @click.native="closeMobileMenuParent" to="/">Home</router-link>
      <router-link @click.native="closeMobileMenuParent" to="/play">Play Game</router-link>
    </div>
    <div class="mobile-nav__mobile-section" v-if="!isLoggedIn">
      <router-link @click.native="closeMobileMenuParent" to="/sign_in">Sign In</router-link>
      <router-link @click.native="closeMobileMenuParent" to="/sign_up">Sign Up</router-link>
    </div>
    <div class="mobile-nav__mobile-section" v-if="isLoggedIn">
      <router-link @click.native="closeMobileMenuParent" to="/settings">Settings</router-link>
      <router-link @click.native="closeMobileMenuParent" to="/games">History</router-link>
      <a href="/signout" @click.prevent="signOutParent">Sign Out</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MobileNavigation',
  props: {
    mobileMenuActive: Boolean,
    isLoggedIn: Boolean
  },
  methods: {
    closeMobileMenuParent() {
      this.$emit('closeMobileMenu');
    },
    signOutParent() {
      this.$emit('signOut');
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
