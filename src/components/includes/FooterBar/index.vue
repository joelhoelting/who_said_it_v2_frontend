<template>
  <div class="footer-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FooterBar'
};
</script>

<style lang="scss" scoped>
.footer-container {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  @include media-query('tablet', 'min') {
    background: rgba(0, 0, 0, 0.2);
    height: 100px;
  }
  @include media-query('tabletLandscape', 'min') {
    background: rgba(0, 0, 0, 0.2);
    height: 120px;
  }
}
</style>
