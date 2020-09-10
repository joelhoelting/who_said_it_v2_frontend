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
  height: 150px;
  @include media-query('tablet', 'min') {
    background: rgba(0, 0, 0, 0.2);
  }
  @include media-query('tabletLandscape', 'min') {
    height: 150px;
  }
  @include media-query('desktop', 'min') {
    height: 200px;
  }
}
</style>
