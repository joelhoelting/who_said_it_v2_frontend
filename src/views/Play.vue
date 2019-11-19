<template>
  <div class="play-container" v-if="!loading">
    <h1 class="play-container__title milkshake center">Select Characters</h1>
    <DifficultyButtons />
    <transition-group class="card-container" tag="div" @before-enter="beforeEnter" @enter="enter">
      <CharacterSelectCard
        v-for="(character, index) in characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </transition-group>

    <Loader v-if="loading" />
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapState, mapActions } from 'vuex';

import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';
import DifficultyButtons from '@/components/pages/play/DifficultyButtons';
import Loader from '@/components/includes/Loader';

export default {
  name: 'Play',
  data() {
    return {
      characters: []
    };
  },
  components: {
    CharacterSelectCard,
    DifficultyButtons,
    Loader
  },
  computed: {
    ...mapState(['character', 'loading'])
  },
  methods: {
    ...mapActions({
      fetchCharacters: 'character/fetchCharacters',
      toggleLoading: 'toggleLoading'
    }),
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '50px';
    },
    enter(el, done) {
      const delay = el.dataset.index * 100;

      setTimeout(() => {
        gsap.to(el, 0.5, {
          opacity: 1,
          left: 0,
          onComplete: done
        });
      }, delay);
    }
  },
  mounted() {
    this.fetchCharacters()
      .then(response => {
        this.characters = response;
      })
      .catch(error => {
        console.log('Failed to GET characters, using backup character data');
        this.characters = error.characters;
      });
  },
  destroyed() {
    this.characters = [];
  }
};
</script>

<style lang="scss" scoped>
.play-container__title {
  font-size: 3rem;
  margin-top: 0;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
