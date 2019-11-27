<template>
  <div class="footer-container">
    <slot />
  </div>
</template>

<style>
.footer-container {
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
