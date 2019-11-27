const images = {
  methods: {
    getCharacterImageMixin(filename) {
      return require(`@/assets/images/characters/${filename}.jpg`);
    },
    getCharacterBackgroundImageMixin(filename, gradientRGBA) {
      const requiredFilename = require(`@/assets/images/characters/${filename}.jpg`);

      if (gradientRGBA) {
        return {
          backgroundImage: `linear-gradient(0deg,rgba(${gradientRGBA}),rgba(${gradientRGBA})), url(${requiredFilename})`
        };
      }

      return { backgroundImage: `url(${requiredFilename})` };
    }
  }
};

export default images;
