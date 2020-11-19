<template>
  <div class="account-panel">
    <h2 class="title center">Account Information</h2>
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
h2 {
  margin-bottom: 2em;
}
</style>
