<template>
  <div class="email-confirmation-modal">
    <transition name="fade">
      <div class="email-confirmation-modal__mesage" v-if="!loadingAnimationActive">
        <p>Confirmation email was sent to {{ email }}</p>
        <p>Please click the confirmation link to finish account setup</p>
        <p
          class="link"
          @click="resendEmail"
        >Don't see the confirmation email? Resend Confirmation Email</p>
        <slot />
      </div>
      <loading-animation v-if="loadingAnimationActive" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

export default {
  name: 'EmailConfirmationMessage',
  components: {
    LoadingAnimation
  },
  props: {
    email: String
  },
  computed: {
    ...mapState(['loadingAnimationActive'])
  },
  methods: {
    ...mapActions('authorization', ['resendConfirmationEmail']),
    resendEmail() {
      this.resendConfirmationEmail({ email: this.email });
    }
  }
};
</script>

<style lang="scss" scoped>
.email-confirmation-modal {
  padding: 10em;
  background: rgba(0, 0, 0, 0.2);
  height: 50%;
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  .email-confirmation-modal__mesage {
    text-align: center;
    position: absolute;
  }
}
</style>
