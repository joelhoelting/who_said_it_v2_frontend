<template>
  <div class="settings-background">
    <div class="delete-account" v-if="!loadingAnimationActive && !deletionPending">
      <transition name="fade">
        <div class="delete-account__request" v-if="!confirmationMsg" @click="toggleConfirmationMsg">
          <h2>Delete Account</h2>
          <button class="btn btn--warning">Delete Your Account</button>
        </div>
      </transition>
      <transition name="fade">
        <div class="delete-account__confirmation" v-if="confirmationMsg">
          <p>Are you sure you want to delete your account?</p>
          <button class="btn btn-confirmation" @click="localDeleteAccount">Yes</button>
          <button class="btn btn-confirmation" @click="toggleConfirmationMsg">No</button>
        </div>
      </transition>
    </div>
    <loading-animation v-if="loadingAnimationActive && deletionPending" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation';

export default {
  name: 'Account',
  components: {
    LoadingAnimation
  },
  data() {
    return {
      confirmationMsg: false,
      deletionPending: false
    };
  },
  computed: {
    ...mapState(['loadingAnimationActive'])
  },
  methods: {
    ...mapActions('authorization', ['deleteAccount']),
    toggleConfirmationMsg() {
      this.confirmationMsg = !this.confirmationMsg;
    },
    localDeleteAccount() {
      this.deletionPending = true;

      this.deleteAccount()
        .then(() => {
          this.$router.push('/signup');
        })
        .catch(() => {
          this.deletionPending = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.delete-account {
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .delete-account__confirmation {
    position: absolute;
    .btn-confirmation {
      margin: 0 1em;
    }
  }
}
</style>
