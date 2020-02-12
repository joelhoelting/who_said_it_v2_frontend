<template>
  <div
    class="small-character-card"
    :style="getCharacterBackgroundImageMixin(character.slug)"
    :title="character.name"
  ></div>
</template>

<script>
import imagesMixin from '@/mixins/images.js';

export default {
  name: 'SmallCharacterCard',
  props: {
    character: Object
  },
  mixins: [imagesMixin],
  mounted() {
    console.log(this.character);
  }
};
</script>

<style lang="scss" scoped>
.small-character-card {
  display: inline-block;
  background-size: cover;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  margin-right: 5px;
}
</style>
