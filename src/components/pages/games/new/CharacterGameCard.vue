<template>
  <div
    @click="submitAnswer(character)"
    class="character-card"
    :style="getCharacterBackgroundImageMixin(character.slug)"
  >
    <div class="character-card__keyboard-number desktop">{{ characterNumber }}</div>
    <div class="character-card__text-container">
      <p class="center">{{ character.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import imagesMixin from '@/mixins/images.js';

export default {
  name: 'CharacterGameCard',
  mixins: [imagesMixin],
  props: {
    character: Object,
    characterNumber: Number
  },
  data() {
    return {
      disableCard: false
    };
  },
  methods: {
    ...mapActions('game', ['submitAnswer'])
  }
};
</script>

<style lang="scss" scoped>
.character-card {
  height: 60px;
  width: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: border 200ms ease;
  border: 2px solid #000;
  @include media-query('tablet', 'min') {
    height: 100px;
    width: 100px;
  }
  @include media-query('tablet', 'min') {
    &:hover {
      border: 3px solid rgba(255, 255, 255, 1);
    }
  }

  .character-card__keyboard-number {
    height: 30px;
    width: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'Baloo', cursive;
  }

  .character-card__text-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0 0 10px 10px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    font-size: 0.8rem;
    @include media-query('tablet', 'min') {
      height: 25%;
    }
  }
}
</style>
