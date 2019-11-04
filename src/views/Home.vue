<template>
  <div class="container home-container">
    <AnimatedTitle />
    <transition name="fade-direction-100" enter-active-class="fade-up-1000-enter-active">
      <h1 v-if="show">The Game of Deciding Who Said What</h1>
    </transition>
    <transition name="fade-direction-100" enter-active-class="fade-up-1000-enter-active">
      <router-link class="btn btn--primary" v-if="show" to="/play" tag="button">Play Game</router-link>
    </transition>
  </div>
</template>

<script>
import AnimatedTitle from '@/components/pages/home/AnimatedTitle';

export default {
  name: 'home',
  data() {
    return {
      show: false
    };
  },
  mounted: function() {
    this.show = true;
  },
  components: {
    AnimatedTitle
  }
};
</script>
