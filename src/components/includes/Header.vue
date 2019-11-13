<template>
  <header>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/play">Play Game</router-link>
      </div>
      <div>
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  height: 100px;
  width: 100%;
  top: 0;
  left: 0;
  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    a {
      margin: 0 0.5em;
    }
  }
}
</style>
