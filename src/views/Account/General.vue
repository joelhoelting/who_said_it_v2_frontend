<template>
  <div class="general-panel">
    <p class="title center underline">User Information</p>
    <p>Email Address: {{ authorization.user.email }}</p>
    <p>Account Creation Date: {{ accountCreationDate }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import { stringifyDateFromString } from '@/helpers/dates';

export default {
  name: 'General',
  computed: {
    ...mapState(['authorization']),
    ...mapGetters('authorization', ['accountCreationDate']),
    accountCreationDate() {
      return this.authorization.user.created_at ? stringifyDateFromString(this.authorization.user.created_at) : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.general-panel {
  background: rgba(0, 0, 0, 0.2);
  padding: 2em;
  .title {
    margin-bottom: 2em;
  }
}
</style>
