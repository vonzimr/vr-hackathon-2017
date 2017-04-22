AFRAME.registerComponent('museumsetup', {
  schema: {type: 'string'},
  init: function () {
    var cylinder_z = -8
    scene = document.querySelector('a-scene');

    function addArt() {
      cylinderEntity = document.createElement('a-cylinder');
      cylinderEntity.setAttribute('position', {x: 1, y: 0, z: cylinder_z});
      cylinderEntity.setAttribute('color', 'red');
      cylinderEntity.setAttribute('height', 2.5);
      cylinderEntity.setAttribute('radius', 0.25);
      scene.appendChild(cylinderEntity);
      cylinder_z -= 3;
    }

    document.querySelector('a-assets');
    a = document.querySelectorAll('img');
    a.forEach(function(x) {addArt();});
  }
});
