<template>
  <div class="container offset-header">
    <difficulty-toolbar />
    <transition-group
      class="card-container"
      tag="div"
      @before-enter="cardBeforeEnter"
      @enter="cardEnter"
    >
      <character-select-card
        v-for="(character, index) in characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </transition-group>
    <footer-bar height="200px">
      <button
        :class="{ disabled: isButtonDisabled }"
        :disabled="isButtonDisabled"
        @click="startGame"
        class="btn btn--start"
      >
        <span v-if="!loadingAnimationActive">{{ playButtonMsg }}</span>
        <loading-animation v-if="loadingAnimationActive" />
      </button>
    </footer-bar>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions, mapGetters, mapState } from 'vuex';

import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';
import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';
import DifficultyToolbar from '@/components/pages/play/DifficultyToolbar.vue';
import FooterBar from '@/components/includes/FooterBar';

export default {
  name: 'Play',
  components: {
    CharacterSelectCard,
    DifficultyToolbar,
    LoadingAnimation,
    FooterBar
  },
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
        const { characters, delay } = response;
        console.log('Succeeded to GET characters from API');
        setTimeout(() => {
          this.characters = characters;
        }, delay);
      })
      .catch(error => {
        const { characters, delay } = error;
        console.log('Failed to GET characters, using local character data');
        setTimeout(() => {
          this.characters = characters;
        }, delay);
      });
  },
  computed: {
    ...mapState(['loadingOverlayActive', 'loadingAnimationActive']),
    ...mapGetters('game', ['charactersRequiredToStartGame']),
    isButtonDisabled() {
      return this.charactersRequiredToStartGame !== 0 || this.loadingAnimationActive;
    },
    playButtonMsg() {
      if (this.loadingAnimationActive) {
        return 'Loading...';
      }

      return this.isButtonDisabled
        ? `Select ${this.charactersRequiredToStartGame} Characters`
        : 'Play Game';
    }
  },
  methods: {
    ...mapActions('character', ['fetchCharacters']),
    ...mapActions('game', ['createGame', 'resetGameState']),
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
  }
}
</style>
