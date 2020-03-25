<template>
  <form class="authentication">
    <h2 class="center">Update Password</h2>
    <input
      :class="errors.oldPassword ? 'error' : ''"
      type="password"
      v-model="oldPassword"
      id="password"
      placeholder="Old Password"
    />
    <input
      :class="errors.newPassword ? 'error' : ''"
      type="password"
      v-model="newPassword"
      id="password"
      placeholder="New Password"
    />
    <input
      :class="errors.confirmNewPassword ? 'error' : ''"
      type="password"
      v-model="confirmNewPassword"
      id="password"
      placeholder="Confirm New Password"
    />
    <button
      class="btn"
      :class="{ disabled: loadingAnimationActive }"
      :disabled="loadingAnimationActive"
      type="submit"
      value="Submit"
    >
      <span v-if="!loadingAnimationActive">Submit</span>
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Security',
  data() {
    return {
      errors: {
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
        errorsArray: []
      },
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  },
  computed: {
    ...mapState(['loadingOverlayActive', 'loadingAnimationActive'])
  }
};
</script>

<style>
</style>
