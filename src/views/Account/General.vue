<template>
  <div class="general-panel">
    {{ this.authorization.user.email }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GeneralAccount',
  computed: {
    ...mapState(['authorization'])
  }
};
</script>

<style lang="scss" scoped>
.general-panel {
  background: rgba(0, 0, 0, 0.2);
  padding: 2em;
}
</style>
