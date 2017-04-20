AFRAME.registerComponent('scale-on-mouseenter', {
  schema: {
    to: {default: '2.5 2.5 2.5'}
  },
  init: function () {
    var data = this.data;
    this.el.addEventListener('click', function () {
      this.setAttribute('scale', data.to);
    });
  }
});
