<template>
  <div class="mobile hamburger-container">
    <div
      class="hamburger-container__hamburger"
      @click="() => this.$emit('toggleMobileMenu')"
      :class="{ active: mobileMenuActive }"
    >
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
      <span class=""></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileHamurger',
  props: {
    mobileMenuActive: Boolean
  }
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  height: 60px;
  width: 60px;
  position: absolute;
  right: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  .hamburger-container__hamburger {
    z-index: 2;
    width: 40px;
    height: 40px;
    overflow: initial;
    position: relative;
    span {
      display: block;
      position: absolute;
      height: 6px;
      width: 50%;
      background: #ffffff;
      opacity: 1;
      box-shadow: 1px 2px rgba(0, 0, 0, 0.5);
      transform: rotate(0deg);
      transition: all 250ms ease-in-out;
      &:nth-child(2n + 1) {
        border-radius: 9px 0 0 9px;
        left: 0px;
      }
      &:nth-child(2n) {
        border-radius: 0 9px 9px 0;
        left: 50%;
      }
      &:nth-child(1),
      &:nth-child(2) {
        top: 6px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        top: 16px;
      }
      &:nth-child(5),
      &:nth-child(6) {
        top: 26px;
      }
    }
    &.active {
      span {
        box-shadow: none;
        &:nth-child(1) {
          left: 4px;
          top: 12px;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          left: 16px;
          top: 12px;
          transform: rotate(-45deg);
        }
        &:nth-child(3) {
          left: -50%;
          opacity: 0;
        }
        &:nth-child(4) {
          left: 100%;
          opacity: 0;
        }
        &:nth-child(5) {
          left: 4px;
          top: 24px;
          transform: rotate(-45deg);
        }
        &:nth-child(6) {
          left: 16px;
          top: 24px;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
