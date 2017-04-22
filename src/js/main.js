require('aframe');
require('aframe-animation-component');
require('aframe-keyboard-controls');
require('./components.js');
///TODO: Break this out into a file or config or something? Hardcoded
//addresses are kind of silly.
var socket = require('socket.io-client')("http://192.168.42.86:3002");

