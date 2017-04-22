var cylinder_z = -6
var scene = document.querySelector('a-scene');
function addArt() {
  var cylinderEntity = document.createElement('a-cylinder');
  cylinderEntity.setAttribute('position', {x: 1, y: 0, z: cylinder_z});
  scene.appendChild(cylinderEntity);
  cylinder_z -= 3;
}

document.querySelector("a-assets");
a = document.querySelectorAll('img');
a.forEach(addArt(x));
