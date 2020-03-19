<template>
  <div class="footer-container" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  computed: {
    style() {
      return `height: ${this.height || '300px'}`;
    }
  },
  props: {
    height: String
  }
};
</script>

<style>
.footer-container {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
