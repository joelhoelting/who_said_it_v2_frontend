<template>
  <div class="footer-container">
    <slot />
    <div
      v-if="hasFooterDrawer"
      class="footer-container__footer-drawer"
      :class="[footerDrawerActive && 'active', classProp]"
    >
      <slot name="footer-drawer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  props: {
    classProp: String,
    footerDrawerActive: Boolean,
    hasFooterDrawer: Boolean
  }
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
  .footer-container__footer-drawer {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 300ms ease, bottom 300ms ease 400ms;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    &.active {
      bottom: 80px;
      opacity: 1;
      transition: opacity 300ms ease, bottom 300ms ease;
      @include media-query('tabletLandscape', 'min') {
        width: 100%;
        bottom: 120px;
      }
    }
    &.bottom-position-overlay {
      bottom: 0;
      &.active {
        z-index: 1;
      }
    }
  }
}
</style>
