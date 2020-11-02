<template>
  <div class="title-container">
    <h1 class="title-container__title milkshake center">
      <slot />
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.title-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  @include media-query('tabletLandscape', 'min') {
    width: auto;
  }
  .title-container__title {
    font-size: 2em;
    margin: 0;
  }
}
</style>
