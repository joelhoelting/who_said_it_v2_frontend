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

    <footer-bar>
      <div class="play-btn-slider-container" :class="isPlayDrawerVisible && 'active'">
        <button
          :class="{ disabled: isPlayButtonDisabled }"
          :disabled="isPlayButtonDisabled"
          @click="startGame"
          class="btn btn--start"
        >
          <span v-if="!loadingAnimationActive">Play Game</span>
          <loading-animation v-if="loadingAnimationActive" />
        </button>
      </div>
      <empty-or-selected-character-card v-for="(n, i) in charactersForSelectedDifficulty" :cardIdx="i" :key="i" />
    </footer-bar>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions, mapGetters, mapState } from 'vuex';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';
import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';
import EmptyOrSelectedCharacterCard from '@/components/pages/play/EmptyOrSelectedCharacterCard.vue';
import DifficultyToolbar from '@/components/pages/play/DifficultyToolbar.vue';
import FooterBar from '@/components/includes/FooterBar';

import imagesMixin from '@/mixins/images.js';

export default {
  name: 'Play',
  components: {
    CharacterSelectCard,
    EmptyOrSelectedCharacterCard,
    DifficultyToolbar,
    LoadingAnimation,
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
    isPlayDrawerVisible() {
      return this.charactersRequiredToStartGame === 0;
    },
    isPlayButtonDisabled() {
      return this.charactersRequiredToStartGame !== 0 || this.loadingAnimationActive;
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
  .footer-container {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    .play-btn-slider-container {
      height: 80px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: opacity 200ms ease, bottom 200ms ease 400ms;
      display: flex;
      align-items: center;
      justify-content: center;
      @include media-query('tabletLandscape', 'min') {
        height: 100px;
        width: 100%;
      }
      &.active {
        bottom: 80px;
        opacity: 1;
        transition: bottom 200ms ease;
        @include media-query('tabletLandscape', 'min') {
          width: 100%;
          bottom: 120px;
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
