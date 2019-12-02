<template>
  <footer-bar>
    <div class="progress-bar" :style="{width: gameProgressPercentage}" />
    <slot />
  </footer-bar>
</template>

<script>
import FooterBar from './index.vue';
import { mapGetters } from 'vuex';

export default {
  mounted() {
    console.log(this.gameProgressPercentage);
  },
  components: {
    FooterBar
  },
  computed: {
    ...mapGetters('game', ['gameProgressPercentage'])
  }
};
</script>

<style lang="scss" scoped>
.footer-container {
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: white;
    transition: width 300ms ease;
  }
}
</style>
