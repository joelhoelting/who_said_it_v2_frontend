<template>
  <div class="character-card" :class="activeClass" :style="activeStyle">
    <div class="character-card__inner">
      <div
        class="character-card__front"
        :style="getCharacterBackgroundImage(character.slug, '0,0,0,0.2')"
      >
        <div class="character-card__text-container">
          <p>{{character.name}}</p>
        </div>
      </div>
      <div
        class="character-card__back"
        :style="getCharacterBackgroundImage(character.slug, '0,0,0,0.5')"
      >
        <img
          class="character-card__checkmark"
          :src="require('@/assets/images/icons/checkmark.svg')"
        />
        <div class="character-card__text-container">
          <p>{{character.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/mixins/images.js';

export default {
  props: {
    character: Object,
    cardIndex: Number,
    active: Boolean
  },
  computed: {
    activeClass() {
      return this.active ? `active-delay-${this.cardIndex}` : undefined;
    },
    activeStyle() {
      const activeStyleObj = {
        transition: `opacity 500ms ease ${this.cardIndex * 100}ms`,
        opacity: 1
      };
      console.log(activeStyleObj);
      return this.active ? activeStyleObj : undefined;
    }
  },
  mixins: [images]
};
</script>

<style lang="scss" scoped>
.character-card {
  width: calc(100% / 8 - 20px);
  perspective: 1000px;
  margin: 10px;
  cursor: pointer;
  opacity: 0;
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .character-card__text-container {
        height: 25%;
        width: 100%;
        border-radius: 0 0 10px 10px;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .character-card__front {
      border: 2px solid #000;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
      .character-card__text-container {
        position: absolute;
        bottom: 0;
      }
    }
    .character-card__back {
      // transform: scale(-1, 1) rotateY(180deg);
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      border: 5px solid rgba(255, 255, 255, 1);
      transform: rotateY(180deg);
      .character-card__checkmark {
        width: 60%;
        margin: 10% auto 0;
      }
    }
  }
}
</style>
