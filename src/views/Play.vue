<template>
  <div class="container">
    <h1>Select Characters</h1>
    <div v-for="character in character.characters" :key="character.id">
      <h1>{{character.name}}</h1>
      <img :src="getCharacterImage(character.slug)" />
    </div>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import images from '@/mixins/images.js';

export default {
  computed: mapState(['character']),
  mixins: [images]
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Milkshake';
}
</style>
