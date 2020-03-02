const dates = {
  methods: {
    parseDateMixin(dateString) {
      const date = new Date(dateString);

      const day = date.getDay();
      const year = date.getFullYear();
      console.log(day, year);

      return date;
    }
  }
};

export default dates;
