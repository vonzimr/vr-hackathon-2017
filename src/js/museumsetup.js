AFRAME.registerComponent('museumsetup', {
  schema: {type: 'string'},
  init: function () {
    var cylinder_z = 0 ;
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
      //artEntity.setAttribute('obj-model', 'mtl', '#' + node.id.replace('obj', 'mtl'));
      artEntity.setAttribute('material', 'color', '#da8005');
      artEntity.setAttribute('material', 'metalness', '0.5');
      scene.appendChild(artEntity);
      cylinder_z -= 3;
    }

    document.querySelector('a-assets');
    a = document.querySelectorAll('a-asset-item');
    a.forEach(function(x, y) {if ((y % 2) === 1){
      return;
    }
    addArt(x);
  });
  }

});
