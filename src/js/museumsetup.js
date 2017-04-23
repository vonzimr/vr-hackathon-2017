AFRAME.registerComponent('museumsetup', {
  schema: {type: 'string'},
  init: function () {
    var cylinder_z = -6
    scene = document.querySelector('a-scene');

    function addArt(node) {
      cylinderEntity = document.createElement('a-cylinder');
      cylinderEntity.setAttribute('position', {x: 1, y: 0, z: cylinder_z});
      cylinderEntity.setAttribute('color', 'red');
      cylinderEntity.setAttribute('height', 2.5);
      cylinderEntity.setAttribute('radius', 0.25);
      cylinderEntity.setAttribute('segmentsRadial', 8);//not working for some reason?
      scene.appendChild(cylinderEntity);
      artEntity = document.createElement('a-entity');
      artEntity.setAttribute('position', {x: 1, y: 1.5, z: cylinder_z});
      artEntity.setAttribute('obj-model', 'obj', '#' + node.id);
      scene.appendChild(artEntity);
      cylinder_z -= 3;
    }

    document.querySelector('a-assets');
    a = document.querySelectorAll('a-asset-item');//placeholder tag
    a.forEach(function(x) {addArt(x);});
  }
});
