require('bufferutil');
var nunjucks  = require('nunjucks');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var fs = require('fs');

//configure nunjucks
nunjucks.configure(__dirname + '/src/templates', {
  autoescape: true,
  express   : app
});
//for the live reload mechanism (see gulpfile)
app.use(require('connect-livereload')({
    port: 35729
}));
app.use(express.static('dist'));
app.set('view engine', 'nunjucks');
app.get('/index', function(req, res){
    res.render(path.normalize(__dirname + "/src/templates/scene-curator.njk"));
});

app.get('/swap', function(req, res){
    res.render(path.normalize(__dirname + "/src/templates/scene-client.njk"));
});


fs.readdir(__dirname + "/dist/assets", function(err, assets){
    assets.forEach(function(asset){
        var ft = asset.split('.');
        console.log(ft[1]);
    });
});

io.on('connection', function(socket){
  var client_id = socket.id;

  console.log('a user connected: ' + socket.id);

  socket.broadcast.to(client_id).emit('id', client_id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('box click', function(x){
      console.log("You clicked the box!");
  });
  socket.on('player-pos', function(pos){
      console.log(pos, socket.id);
      socket.broadcast.emit('player-pos', pos);
  });

  socket.on('player-rot', function(rot){
      console.log(rot, socket.id);
      socket.broadcast.emit('player-rot', rot);
  });
});


http.listen(3002, function() {
    console.log("listening on: *:3002");
});

