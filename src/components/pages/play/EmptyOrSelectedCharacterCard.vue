<template>
  <div class="empty-or-selected-character-card">
    <div
      v-if="characterIds[cardIdx]"
      @click="addOrRemoveCharacterFromGame(characterIds[cardIdx])"
      class="empty-or-selected-character-card__selected"
      :style="getSelectedCharacterImage"
    >
      <img
        class="empty-or-selected-character-card__close-icon"
        :src="require('@/assets/images/icons/character_close_icon.png')"
        alt="Remove Character"
      />
    </div>
    <div v-else class="empty-or-selected-character-card__empty"><span>?</span></div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import imagesMixin from '@/mixins/images.js';

export default {
  name: 'EmptyOrSelectedCharacterCard',
  props: {
    cardIdx: Number
  },
  mixins: [imagesMixin],
  computed: {
    ...mapState('game', ['characterIds']),
    ...mapGetters('character', ['findCharacterById']),
    getSelectedCharacterImage() {
      if (this.findCharacterById(this.characterIds[this.cardIdx])) {
        const getCharacterSlug = this.findCharacterById(this.characterIds[this.cardIdx]).slug;
        return this.getCharacterBackgroundImageMixin(getCharacterSlug, '0,0,0,0.2');
      }
      return false;
    }
  },
  methods: {
    ...mapActions('game', ['addOrRemoveCharacterFromGame'])
  },
  created() {
    console.log(this.cardIdx);
  }
};
</script>

<style lang="scss" scoped>
.empty-or-selected-character-card {
  border: 1px solid #fff;
  height: 60px;
  width: 60px;
  margin: 10px;
  border-radius: 10px;
  @include media-query('tablet', 'min') {
    height: 100px;
    width: 100px;
  }

  .empty-or-selected-character-card__selected {
    height: 100%;
    width: 100%;
    background-size: cover;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    @include media-query('tablet', 'min') {
      &:hover .empty-or-selected-character-card__close-icon {
        height: 30px;
        width: 30px;
      }
    }
    .empty-or-selected-character-card__close-icon {
      height: 20px;
      width: 20px;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      transition: all 150ms ease;
    }
  }

  .empty-or-selected-character-card__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    animation: pulse 2s ease infinite;
    span {
      font-family: 'Milkshake';
      font-size: 2em;
    }
  }
}
</style>
