<template>
  <div class="play-container">
    <h1 class="title milkshake center">Select Characters</h1>
    <transition-group
      class="card-container"
      tag="div"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <CharacterSelectCard
        v-for="(character, index) in characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </transition-group>
  </div>
</template>

<script>
import { TweenLite } from 'gsap';
import { mapState, mapActions } from 'vuex';

import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';

export default {
  name: 'play',
  data() {
    return {
      characters: [],
      animating: false
    };
  },
  components: {
    CharacterSelectCard
  },
  mounted() {
    this.fetchCharacters()
      .then(response => {
        this.characters = response;
      })
      .catch(error => {
        console.log('Fetch failed, using backup character data');
        this.characters = error.characters;
      });
  },
  destroyed() {
    this.characters = [];
  },
  computed: mapState(['character']),
  methods: {
    ...mapActions('character', ['fetchCharacters', 'clearCharacters']),
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '50px';

      if (!this.animating) {
        this.animating = true;
      }
    },
    enter(el, done) {
      const delay = el.dataset.index * 100;

      setTimeout(() => {
        TweenLite.to(el, 0.5, {
          opacity: 1,
          left: 0,
          onComplete: done
        });
      }, delay);
    },
    afterEnter(el) {
      if (+el.dataset.index === this.character.characters.length - 1) {
        this.animating = false;
      }
    }
    // beforeLeave() {
    //   if (!this.animating) {
    //     this.animating = true;
    //   }
    // },
    // leave(el, done) {
    //   TweenLite.to(el, 0.5, {
    //     opacity: 0,
    //     onComplete: done
    //   });
    // },
    // afterLeave(el) {
    //   if (+el.dataset.index === this.character.characters.length - 1) {
    //     this.animating = false;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
h1.title {
  font-size: 3rem;
  margin-top: 0;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
