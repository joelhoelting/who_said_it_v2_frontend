<template>
  <div class="play-container">
    <h1 class="title milkshake center">Select Characters</h1>
    <div class="card-container">
      <CharacterCard
        v-for="character in character.characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CharacterCard from '@/components/pages/play/CharacterCard.vue';

export default {
  components: {
    CharacterCard
  },
  computed: mapState(['character'])
};
</script>

<style lang="scss" scoped>
h1.title {
  font-size: 2rem;
  margin-top: 0;
}
.card-container {
  display: flex;
  background: grey;
  flex-wrap: wrap;
}
</style>
