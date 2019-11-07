const images = {
  methods: {
    getCharacterImage(filename) {
      return require(`@/assets/images/characters/${filename}.jpg`);
    },
    getCharacterBackgroundImage(filename, gradientRGBA) {
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
