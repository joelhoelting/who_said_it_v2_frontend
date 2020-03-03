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

      return `${month + 1}/${dayOfMonth}/${year} - ${hours}:${minutes}${ampm}`;
    }
  }
};

export default dates;

// function pad(num) {
//   return ('0' + num).slice(-2);
// }
// function time1() {
//   var today = new Date(),
//     h = today.getHours(),
//     m = today.getMinutes(),
//     s = today.getSeconds();

//   h = h % 12;
//   h = h ? h : 12; // the hour '0' should be '12'
//   clk.innerHTML = h + ':' + pad(m) + ':' + pad(s) + ' ' + (h >= 12 ? 'PM' : 'AM');
// }
// window.onload = function() {
//   var clk = document.getElementById('clk');
//   t = setInterval(time1, 500);
// };
