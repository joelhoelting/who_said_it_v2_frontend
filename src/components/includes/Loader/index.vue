<template>
  <div class="loader-container" :style="styleObject">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    height: String
  },
  data() {
    return {
      styleObject: {
        height: this.height
      }
    };
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

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: loadAnimation 1s infinite ease-in-out;
}

.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0) translateX(-50%);
  animation-delay: -0.16s;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
  }

  &:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 3.5em;
  }
}

@keyframes loadAnimation {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
