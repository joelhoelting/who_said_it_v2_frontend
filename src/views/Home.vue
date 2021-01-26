<template>
  <div class="container flex-center-container">
    <AnimatedTitle class="desktop" />
    <img class="title-mobile mobile" :src="require('@/assets/images/logos/who_said_it_logo.svg')" />
    <div ref="ctaRef" class="cta-container">
      <h1 class="center">The Game of Deciding Who Said What test</h1>
      <router-link class="btn btn--shadow btn--play" to="/play" tag="button">Play Game</router-link>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import AnimatedTitle from '@/components/pages/home/AnimatedTitle';

export default {
  name: 'Home',
  mounted() {
    this.animateCTA();
  },
  components: {
    AnimatedTitle,
  },
  methods: {
    animateCTA() {
      const { ctaRef } = this.$refs;
      gsap.fromTo(ctaRef, { opacity: 0, top: '100px' }, { opacity: 1, duration: 1, top: 0, ease: 'power2.out' });
    },
  },
};
</script>

<style lang="scss" scoped>
img.title-mobile {
  margin: 1em 0;
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto;
}
.cta-container {
  position: relative;
  opacity: 0;
  h1 {
    font-size: 1em;
    margin: 1em 0;
    font-family: 'Lato';
    font-weight: 300;
    @include media-query('phoneXL', 'min') {
      font-size: 1.4em;
    }
  }
  button {
    margin: 1em 0 0;
  }
}
</style>
