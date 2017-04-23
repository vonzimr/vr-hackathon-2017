var server = "http://192.168.1.3:3002";
socket = require('socket.io-client')(server); 

AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },
  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },
  tick: function (time, timeDelta) {
    var directionVec3 = this.directionVec3;
    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;
    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(targetPosition).sub(currentPosition);
    // Calculate the distance.
    var distance = directionVec3.length();
    // Don't go any closer if a close proximity has been reached.
    if (distance < 5) { return; }
    // Scale the direction vector's magnitude down to match the speed.
    var factor = this.data.speed / distance;
    ['x', 'y', 'z'].forEach(function (axis) {
      directionVec3[axis] *= factor * (timeDelta / 1000);
    });
    // Translate the entity in the direction towards the target.
    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });
  }
});

AFRAME.registerComponent('plaque', {
    schema:{
        file: {type: 'array'}
        target: {type: 'target'}
    },
   init: function(){
      var textel = this.target; 
      textel.setAttribute("font","mozillavr");
      textel.setATtribute("value", array[0]);


   }

   update: function(oldData){

   }
}

AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],
  init: function () {
    this.el.addEventListener('raycaster-intersected', function () {
      console.log('Player hit something!');
    });
  }
});
   


AFRAME.registerComponent('check-distance', {
  schema: {
    target: {type: 'selector'},
    dist: {default: 1},
  },
  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },
  tick: function (time, timeDelta) {
    var directionVec3 = this.directionVec3;
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;
    directionVec3.copy(targetPosition).sub(currentPosition);
    var distance = directionVec3.length();
    if (distance < 5) {
        socket.emit('switch room', null);
        this.data.target.setAttribute('position', {
            x: 0,
            y: 2,
            z: -10});
    }

  }
});

AFRAME.registerComponent('do-something-on-head-movement', {
  init: function () {
    var scene = this.el;
    var camera = scene.cameraEl;

    camera.addEventListener('componentchanged', function (evt) {
      if (evt.detail.name === 'rotation' || evt.detail.name === 'position') {
        // Do something.
      }

    });
  }
});

AFRAME.registerComponent('socket-send-position', {
    init: function () {
        var scene = this.el;
        var data = this.data;
        var el = this.el;
        this.el.addEventListener('componentchanged', function (evt) {
            if (evt.detail.name === 'position') {
                socket.emit('player-pos', el.object3D.position);
            }

            if (evt.detail.name === 'rotation') {
                socket.emit('player-rot', el.object3D.rotation);
            }
        });
    }
});

AFRAME.registerComponent('socket-receive-position', {
    schema:{
        event:{default: ""}
    },
    init:function(){
        this.timeStep = .5;
        this.acc = 0 
        var el = this.el;
        socket.on('player-pos', function(pos){
            el.setAttribute('position', {
                x: pos.x,
                y: pos.y,
                z: pos.z
            });
        });


        socket.on('player-rot', function(rot){
            console.log(rot);
            el.setAttribute('rotation', {
                x: rot._x,
                y: rot._y,
                z: rot._z
            });
        });

    }
});
