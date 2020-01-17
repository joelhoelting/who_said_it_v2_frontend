<template>
  <div
    @click="submitAnswer(character)"
    class="character-card"
    :style="getCharacterBackgroundImageMixin(character.slug)"
  >
    <div class="character-card__keyboard-number">{{characterNumber}}</div>
    <div class="character-card__text-container">
      <p>{{character.name}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import images from '@/mixins/images.js';

export default {
  name: 'CharacterGameCard',
  mixins: [images],
  data() {
    return {
      disableCard: false
    };
  },
  props: {
    character: Object,
    characterNumber: Number
  },
  methods: {
    ...mapActions('game', ['submitAnswer'])
  }
};
</script>

<style lang="scss" scoped>
.character-card {
  height: 200px;
  width: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: border 200ms ease;
  border: 2px solid #000;
  &:hover {
    border: 5px solid rgba(255, 255, 255, 1);
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
    // background: rgba(0, 0, 0, 0.4);
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
    height: 25%;
    width: 100%;
  }
}
</style>
