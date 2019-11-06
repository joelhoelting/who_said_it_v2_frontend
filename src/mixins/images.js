const images = {
  methods: {
    getCharacterImage(filename) {
      return require(`@/assets/images/characters/${filename}.jpg`);
    }
  }
};

export default images;
