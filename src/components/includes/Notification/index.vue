<template>
  <transition name="slide-up" tag="div">
    <div class="notification-container" v-if="notifications.length > 0">
      <p :class="notificationTypeClass">{{ notifications[0].message }}</p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('notification', ['notifications']),
    notificationTypeClass() {
      return this.notifications.length > 0 ? `notification notification--${this.notifications[0].type}` : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .notification {
    &.notification--error {
      color: $incorrect-red;
    }
    &.notification--success {
      color: $correct-green;
    }
  }
}
</style>
