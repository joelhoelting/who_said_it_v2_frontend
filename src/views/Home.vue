<template>
  <div class="container home-container">
    <AnimatedTitle />
    <div ref="ctaRef" class="cta-container">
      <h1>The Game of Deciding Who Said What</h1>
      <router-link class="btn btn--primary" to="/play" tag="button">Play Game</router-link>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import AnimatedTitle from '@/components/pages/home/AnimatedTitle';

export default {
  name: 'home',
  mounted() {
    this.animateCTA();
  },
  components: {
    AnimatedTitle
  },
  methods: {
    animateCTA() {
      const { ctaRef } = this.$refs;

      gsap.fromTo(
        ctaRef,
        { opacity: 0, top: '100px' },
        { opacity: 1, duration: 1, top: 0, ease: 'power2.out' }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.cta-container {
  position: relative;
  button {
    display: block;
    margin: 0 auto;
  }
}
</style>
