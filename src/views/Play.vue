<template>
  <div class="container offset-header">
    <difficulty-toolbar />
    <transition-group class="card-container" tag="div" @before-enter="cardBeforeEnter" @enter="cardEnter">
      <character-select-card
        v-for="(character, index) in characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </transition-group>
    <div v-if="charactersRequiredToStartGame === 0" class="play-btn-slider-container">
      <button
        :class="{ disabled: isButtonDisabled }"
        :disabled="isButtonDisabled"
        @click="startGame"
        class="btn btn--start"
      >
        <span v-if="!loadingAnimationActive">{{ playButtonMsg }}</span>
        <loading-animation v-if="loadingAnimationActive" />
      </button>
    </div>
    <footer-bar>
      <div class="selected-character-tile" v-for="(n, i) in charactersForSelectedDifficulty" :key="i">
        <div
          v-if="characterIds[i]"
          :style="getSelectedCharacterImage(i)"
          class="selected-character-tile__selected"
          @click="addOrRemoveCharacterFromGame(characterIds[i])"
        >
          <img
            class="selected-character-tile__close-icon"
            :src="require('@/assets/images/icons/character_close_icon.png')"
            alt="remove character"
          />
        </div>
        <div v-else class="selected-character-tile__empty"><span>?</span></div>
      </div>
    </footer-bar>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions, mapGetters, mapState } from 'vuex';

// import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';
import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';
import DifficultyToolbar from '@/components/pages/play/DifficultyToolbar.vue';
import FooterBar from '@/components/includes/FooterBar';

import imagesMixin from '@/mixins/images.js';

export default {
  name: 'Play',
  components: {
    CharacterSelectCard,
    DifficultyToolbar,
    // LoadingAnimation,
    FooterBar
  },
  mixins: [imagesMixin],
  data() {
    return {
      characters: []
    };
  },
  created() {
    // Reset game state (game module)
    this.resetGameState();
    // Fetch characters (character module)
    this.fetchCharacters()
      .then(response => {
        const { characters } = response;
        console.log('Succeeded to GET characters from API');
        this.characters = characters;
      })
      .catch(error => {
        const { characters } = error;
        console.log('Failed to GET characters, using local character data');
        this.characters = characters;
      });
  },
  computed: {
    ...mapState(['loadingOverlayActive', 'loadingAnimationActive']),
    ...mapState('game', ['characterIds']),
    ...mapGetters('game', ['charactersRequiredToStartGame', 'charactersForSelectedDifficulty']),
    ...mapGetters('character', ['findCharacterById']),
    isButtonDisabled() {
      return this.charactersRequiredToStartGame !== 0 || this.loadingAnimationActive;
    },
    playButtonMsg() {
      if (this.loadingAnimationActive) {
        return 'Loading...';
      }

      return this.isButtonDisabled ? `Select ${this.charactersRequiredToStartGame} Characters` : 'Play Game';
    }
  },
  methods: {
    ...mapActions('character', ['fetchCharacters']),
    ...mapActions('game', ['addOrRemoveCharacterFromGame', 'createGame', 'resetGameState']),
    getSelectedCharacterImage(index) {
      if (this.findCharacterById(this.characterIds[index])) {
        const getCharacterSlug = this.findCharacterById(this.characterIds[index]).slug;
        return this.getCharacterBackgroundImageMixin(getCharacterSlug, '0,0,0,0.2');
      }
    },
    cardBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.left = '50px';
    },
    cardEnter(el, done) {
      const delay = el.dataset.index * 80;

      setTimeout(() => {
        gsap.to(el, 0.4, {
          opacity: 1,
          left: 0,
          onComplete: done
        });
      }, delay);
    },
    startGame() {
      this.createGame().then(() => {
        this.$router.push('/games/new');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 100px;
    @include media-query('tabletLandscape', 'min') {
      padding-bottom: 0;
    }
  }
  .play-btn-slider-container {
    height: 120px;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: bottom 300ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      bottom: 120px;
      opacity: 1;
      transition: bottom 300ms ease;
    }
  }
  .footer-container {
    .selected-character-tile {
      border: 1px solid #fff;
      height: 100px;
      width: 100px;
      margin: 10px;
      border-radius: 10px;

      .selected-character-tile__selected {
        height: 100%;
        width: 100%;
        background-size: cover;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        @include media-query('tabletLandscape', 'min') {
          &:hover .selected-character-tile__close-icon {
            height: 30px;
            width: 30px;
          }
        }
        .selected-character-tile__close-icon {
          height: 20px;
          width: 20px;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          transition: all 150ms ease;
        }
      }

      .selected-character-tile__empty {
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
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.6);
  }

  100% {
    transform: scale(1);
  }
}
</style>
