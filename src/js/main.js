require('aframe');
require('aframe-animation-component');
require('./components.js');
///TODO: Break this out into a file or config or something? Hardcoded
//addresses are kind of silly.
var socket = require('socket.io-client')("http://192.168.0.118:3002");

