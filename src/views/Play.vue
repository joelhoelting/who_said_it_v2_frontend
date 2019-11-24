<template>
  <div class="play-container">
    <transition name="fade">
      <h1
        v-if="!loadingOverlayActive"
        class="play-container__title milkshake center"
      >Select Characters</h1>
    </transition>
    <transition name="fade">
      <difficulty-toolbar v-if="!loadingOverlayActive" />
    </transition>
    <transition-group
      class="card-container"
      tag="div"
      @before-enter="cardBeforeEnter"
      @enter="cardEnter"
    >
      <CharacterSelectCard
        v-for="(character, index) in characters"
        :key="character.id"
        :character="character"
        :data-index="index"
      />
    </transition-group>
    <transition name="fade">
      <div class="btn-container" v-if="!loadingOverlayActive">
        <button
          :class="{ disabled: isButtonDisabled }"
          :disabled="isButtonDisabled"
          @click="startGame"
          class="btn btn--start"
        >
          <span v-if="!loadingAnimationActive">{{ displayButtonMsg }}</span>
          <loading-animation v-if="loadingAnimationActive" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapActions, mapGetters, mapState } from 'vuex';

import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';
import DifficultyToolbar from '@/components/pages/play/DifficultyToolbar.vue';
import LoadingAnimation from '@/components/includes/Loader/LoadingAnimation.vue';

export default {
  name: 'Play',
  data() {
    return {
      characters: [],
      mounted: false
    };
  },
  components: {
    CharacterSelectCard,
    DifficultyToolbar,
    LoadingAnimation
  },
  computed: {
    ...mapState([
      'character',
      'game',
      'loadingOverlayActive',
      'loadingAnimationActive'
    ]),
    ...mapGetters('game', ['charactersRequiredToStartGame']),
    isButtonDisabled() {
      return (
        this.charactersRequiredToStartGame !== 0 || this.loadingAnimationActive
      );
    },
    displayButtonMsg() {
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
      const delay = el.dataset.index * 100;

      setTimeout(() => {
        gsap.to(el, 0.5, {
          opacity: 1,
          left: 0,
          onComplete: done
        });
      }, delay);
    },
    startGame() {
      this.createGame().then(response => {
        console.log(response);
      });
    }
  },
  mounted() {
    this.mounted = true;

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
    this.resetGameState();
  }
};
</script>

<style lang="scss" scoped>
.play-container {
  .play-container__title {
    font-size: 3rem;
    margin: 0;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }
  .btn-container {
    position: absolute;
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn--start {
      display: block;
      font-size: 2rem;
      padding: 20px 100px;
      width: 20em;
    }
  }
}
</style>
