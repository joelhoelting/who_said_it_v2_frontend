const dates = {
  methods: {
    parseDateMixin(dateString) {
      const date = new Date(dateString);

      const dayOfMonth = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      let hours = date.getHours();
      let ampm = hours < 12 ? 'AM' : 'PM';

      hours = hours % 12 === 0 ? 12 : hours % 12;

      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return `${month + 1}/${dayOfMonth}/${year} - ${hours}:${minutes}${ampm}`;
    }
  }
};

export default dates;
