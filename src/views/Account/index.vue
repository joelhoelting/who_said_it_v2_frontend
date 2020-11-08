<template>
  <div class="account-container">
    <nav class="account-menu">
      <ul>
        <li>
          <router-link to="/account/general">General</router-link>
        </li>
        <li>
          <router-link to="/account/update_email">Update Email</router-link>
        </li>
        <li>
          <router-link to="/account/update_password">Update Password</router-link>
        </li>
        <li>
          <router-link to="/account/delete_account">Delete Account</router-link>
        </li>
      </ul>
    </nav>
    <div class="account-slot">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'account',
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
    ...mapState(['authorization']),
    ...mapGetters('authorization', ['isLoggedIn'])
  }
};
</script>

<style lang="scss" scoped>
.account-menu {
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  width: 300px;
  @include media-query('tablet', 'max') {
    display: none;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      height: 80px;
      width: 100%;
      &.account-menu_email-address {
        h6 {
          text-align: center;
          margin: 0;
        }
      }
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
.account-slot {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .account-background {
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
