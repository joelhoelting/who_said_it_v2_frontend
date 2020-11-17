<template>
  <div class="account-panel">
    <div class="delete-account delete-account__request" v-if="!confirmationMsg">
      <h2>Delete Account</h2>
      <button class="btn btn--warning" @click="toggleConfirmationMsg">Delete Your Account</button>
    </div>
    <div class="delete-account delete-account__confirmation" v-if="confirmationMsg">
      <p>Are you sure you want to delete your account?</p>
      <button class="btn btn-confirmation" @click="localDeleteAccount">Yes</button>
      <button class="btn btn-confirmation" @click="toggleConfirmationMsg">No</button>
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
          this.$router.push('/sign_up');
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
  .btn-confirmation {
    margin: 0 1em;
  }
}
</style>
