<template>
  <h1>Hello World</h1>
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
.delete-account {
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .delete-account__confirmation {
    position: absolute;
    .btn-confirmation {
      margin: 0 1em;
    }
  }
}
</style>
