<template>
  <div class="character-card">
    <div class="character-card__inner">
      <div class="character-card__front" :style="getCharacterBackgroundImage(character.slug)" />
      <div
        class="character-card__back"
        :style="getCharacterBackgroundImage(character.slug, '0,0,0,0.3')"
      ></div>
    </div>
  </div>
</template>

<script>
import images from '@/mixins/images.js';

export default {
  props: {
    character: Object
  },
  mixins: [images]
};
</script>

<style lang="scss" scoped>
.character-card {
  background-color: transparent;
  width: calc(100% / 8 - 20px);
  perspective: 1000px;
  margin: 10px;
  &:hover .character-card__inner {
    transform: rotateY(180deg);
  }
  .character-card__inner {
    position: relative;
    width: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    padding-top: 100%;
    .character-card__front,
    .character-card__back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-size: cover;
    }
    .character-card__back {
      // transform: scale(-1, 1) rotateY(180deg);
      transform: rotateY(180deg);
    }
  }
}
</style>
