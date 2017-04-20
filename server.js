var express = require('express');
//global.jQuery = global.$ = require('jquery'); 
var app = express();
var http = require('http');

var _cpu = require('./cpu');


// Set template engine
app.set('view engine', 'ejs');

// Set static folder. Così nel file html posso puntare a <link href="static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
//http://expressjs.com/it/starter/static-files.html
//app.use('/static', express.static(__dirname + '/public'));
//app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', function (req, res) {

    //res.render('index.ejs', {conf: _config});
    res.render('index.ejs');

});

///////////////////////////
///// SOCKET IO //////////
//////////////////////////
var httpServer = http.Server(app);
httpServer.listen(3000, function () {
    console.log('Server started on port ' + 3000);
});

io = require('socket.io').listen(httpServer);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  
});


///////////////////////////
///////// TIMER //////////
//////////////////////////
var timerCheckCpu;
var intervalCheckCpu_ms = 1000;
var CheckCpuStatus = function(){

  clearTimeout(timerCheckCpu);

  timerCheckCpu = setTimeout(function(){CheckCpuStatus();}, intervalCheckCpu_ms);
  _cpu.getCpuLoad(io);

}


CheckCpuStatus();

