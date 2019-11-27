<template>
  <div class="title-container">
    <h1 class="title-container__title milkshake center">
      <slot />
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  .title-container__title {
    font-size: 3rem;
    margin: 0;
  }
}
</style>
