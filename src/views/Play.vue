<template>
  <div class="container">
    <h1>Characters</h1>
    <h1 v-for="character in character.characters" :key="character.id">{{character.name}}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['character'])
};
</script>
