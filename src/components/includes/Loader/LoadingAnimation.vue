<template>
  <div class="spinner">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  margin: 0 auto;
  text-align: center;
  .circle {
    animation: bounceAnimation 1s infinite ease-in-out both;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    height: 18px;
    margin: 0 2px;
    width: 18px;
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bounceAnimation {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>>
