require('bufferutil');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

//for the live reload mechanism (see gulpfile)
app.use(require('connect-livereload')({
    port: 35729
}));
app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(path.normalize(__dirname + "/dist/index.html"));
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('box click', function(x){
      console.log("You clicked the box!");
  });
});


http.listen(3002, function() {
    console.log("listening on: *:3002");
});

