<template>
  <form class="authentication" @submit.prevent="localUpdatePassword">
    <h2 class="center">Update Password</h2>
    <input
      :class="errors.original_password ? 'error' : ''"
      type="password"
      v-model="original_password"
      id="password"
      placeholder="Original Password"
    />
    <input
      :class="errors.password ? 'error' : ''"
      type="password"
      v-model="password"
      id="password"
      placeholder="New Password"
    />
    <input
      :class="errors.password_confirmation ? 'error' : ''"
      type="password"
      v-model="password_confirmation"
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
      <loading-animation v-if="loadingAnimationActive" />
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { initializeVueReCaptcha } from '@/helpers/recaptcha';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'UpdatePassword',
  components: {
    LoadingAnimation
  },
  data() {
    return {
      errors: {
        original_password: false,
        password: false,
        password_confirmation: false,
        errorsArray: []
      },
      original_password: 'someThing123$',
      password: 'someThing1234$',
      password_confirmation: 'someThing1234$'
    };
  },
  created() {
    if (this.$recaptchaInstance) {
      this.$recaptchaInstance.showBadge();
    } else {
      initializeVueReCaptcha();
    }
  },
  destroyed() {
    this.$recaptchaInstance.hideBadge();
  },
  computed: {
    ...mapState(['loadingAnimationActive'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      updatePassword: 'authorization/updatePassword'
    }),
    localUpdatePassword() {
      let { original_password, password, password_confirmation } = this;

      if (isValidAuthForm(this, { original_password, password, password_confirmation })) {
        this.updatePassword({
          auth: {
            original_password,
            password,
            password_confirmation
          }
        });
      } else {
        this.addNotification({
          type: 'error',
          message: this.errors.errorsArray[0]
        });
      }
    }
  }
};
</script>

<style></style>
