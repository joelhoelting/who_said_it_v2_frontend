<template>
  <div class="account-panel">
    <div class="delete-account">
      <h2>Delete Account</h2>
      <label for="delete">
        <span>type "delete"</span>
        <input v-model="deletionInput" class="standard-input" name="delete" id="delete" type="text" />
      </label>
      <button
        :class="{ disabled: isDeleteButtonDisabled }"
        :disabled="isDeleteButtonDisabled"
        class="btn btn--warning"
        @click="localDeleteAccount"
      >
        <span v-if="!loadingAnimationActive">Delete</span>
        <loading-animation v-if="loadingAnimationActive" />
      </button>
    </div>
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
      deletionInput: 'delete'
    };
  },
  computed: {
    ...mapState(['loadingAnimationActive']),
    isDeleteButtonDisabled() {
      return this.deletionInput !== 'delete';
    }
  },
  methods: {
    ...mapActions('authorization', ['deleteAccount']),
    localDeleteAccount() {
      console.log('hello');

      this.deleteAccount().then(() => {
        this.$router.push('/sign_up');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.delete-account {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin-top: 0;
  }
  label {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1em;
    span {
      margin: 0.5em 0;
    }
  }
}
</style>
