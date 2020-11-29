<template>
  <recaptcha-wrapper>
    <form class="authentication" @submit.prevent="localUpdateEmail">
      <h2 class="center">Update Email</h2>
      <p class="center">Current Email Address: {{ authorization.user.email }}</p>
      <input
        :class="errors.email ? 'error' : ''"
        type="email"
        v-model="email"
        id="email"
        placeholder="New Email Address"
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
  </recaptcha-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import RecaptchaWrapper from '@/components/hoc/RecaptchaWrapper';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

import { isValidAuthForm } from '@/helpers/validations';

export default {
  name: 'UpdateEmail',
  components: {
    LoadingAnimation,
    RecaptchaWrapper
  },
  data() {
    return {
      errors: {
        email: false,
        errorsArray: []
      },
      email: 'test1@test.com'
    };
  },
  computed: {
    ...mapState(['authorization', 'loadingAnimationActive'])
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      updateEmail: 'authorization/updateEmail'
    }),
    async localUpdateEmail() {
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "update_email".
      const token = await this.$recaptcha('update_email');

      let { email } = this;

      if (isValidAuthForm(this, { email })) {
        this.updateEmail({
          user: {
            email
          },
          recaptcha: {
            token
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
