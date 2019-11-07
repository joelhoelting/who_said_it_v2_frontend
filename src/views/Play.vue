<template>
  <div class="play-container">
    <h1 class="title milkshake center">Select Characters</h1>
    <div class="card-container">
      <CharacterSelectCard
        v-for="character in character.characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CharacterSelectCard from '@/components/pages/play/CharacterSelectCard.vue';

export default {
  data() {
    return {
      charactersLoaded: false
    };
  },
  components: {
    CharacterSelectCard
  },
  mounted() {
    this.fetchCharacters()
      .then(response => {
        this.charactersLoaded = true;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: mapState(['character']),
  methods: mapActions('character', ['fetchCharacters'])
};
</script>

<style lang="scss" scoped>
h1.title {
  font-size: 3rem;
  margin-top: 0;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
