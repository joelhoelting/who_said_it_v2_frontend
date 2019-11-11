<template>
  <div class="container home-container">
    <AnimatedTitle />
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <h1
        :style="{ position: 'relative' }"
        v-if="mounted"
        :data-index="0"
      >The Game of Deciding Who Said What</h1>
    </transition>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <router-link
        v-if="mounted"
        :style="{ position: 'relative' }"
        class="btn btn--primary"
        :data-index="1"
        to="/play"
        tag="button"
      >Play Game</router-link>
    </transition>
  </div>
</template>

<script>
import { TweenLite } from 'gsap';
import AnimatedTitle from '@/components/pages/home/AnimatedTitle';

export default {
  name: 'home',
  data() {
    return {
      mounted: false,
      animating: false
    };
  },
  mounted() {
    this.mounted = true;
  },
  components: {
    AnimatedTitle
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.top = '100px';

      if (!this.animating) {
        this.animating = true;
      }
    },
    enter(el, done) {
      TweenLite.to(el, 1, {
        opacity: 1,
        top: 0,
        onComplete: done
      });
    },
    afterEnter(el) {
      if (parseInt(el.dataset.index) === 1) {
        this.animating = false;
      }
    }
  }
};
</script>
