<template>
  <transition name="slide-up" tag="div">
    <div class="notification-container" v-if="notifications.length > 0">
      <p v-if="notifications.length > 0">
        {{ notifications[0].message }}
      </p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('notification', ['notifications'])
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
}
</style>
