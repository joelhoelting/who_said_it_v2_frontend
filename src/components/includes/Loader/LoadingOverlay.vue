<template>
  <div class="loader-container">
    <loading-animation />
  </div>
</template>

<script>
import LoadingAnimation from './LoadingAnimation.vue';

export default {
  name: 'LoadingOverlay',
  components: {
    LoadingAnimation
  }
};
</script>

<style lang="scss" scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: -1;
}
</style>
