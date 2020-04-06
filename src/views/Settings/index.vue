<template>
  <div class="settings-container">
    <div class="settings-menu">
      <ul>
        <li>
          <router-link to="/settings/profile">PROFILE</router-link>
        </li>
        <li>
          <router-link to="/settings/security">SECURITY</router-link>
        </li>
        <li>
          <router-link to="/settings/account">ACCOUNT</router-link>
        </li>
      </ul>
    </div>
    <div class="settings-slot">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Settings',
  data() {
    return {
      currentRoute: ''
    };
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/signin');
    }
    this.currentRoute = this.$route.name;
  },
  updated() {
    this.currentRoute = this.$route.name;
  },
  computed: {
    ...mapGetters('authorization', ['isLoggedIn'])
  }
};
</script>

<style lang="scss" scoped>
.settings-menu {
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  width: 300px;
  border-right: 1px solid white;
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      height: 80px;
      width: 100%;
      a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 300ms ease;
        text-decoration: none;
        &.router-link-active {
          background: rgba(255, 255, 255, 0.3);
        }
        &:not(.router-link-active):hover {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
.settings-slot {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .settings-background {
    background: $opaque-black-background;
    height: 75%;
    width: 80%;
    padding: 0 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
