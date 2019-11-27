<template>
  <div class="container">
    <form @submit.prevent="signIn">
      <label for="email">
        Email Address
        <input type="email" v-model="email" id="email" placeholder="your@email.com" />
      </label>
      <label for="password">
        Password
        <input type="password" v-model="password" id="password" placeholder="Password" />
      </label>
      <button type="submit" value="Submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
