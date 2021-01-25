module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/stylesheets/base/variables.scss"; @import "@/assets/stylesheets/base/mixins.scss";`
      }
    }
  }
};
