
const express = require("express");
const http = require("http");
const app = express();
const expressWs = require('express-ws')(app);
var zmq;
var sock;

module.exports = {
  init: init
};

function init() {
  express_init();
  zmq_init();
}

function express_init() {
  var path = __dirname + '/views/';
  var router = express.Router();

  router.get("/", function(req, res, next) {
  	console.log("Fired / handler. ");
    res.sendFile(path + "index.html");
	});


  router.get("/*.html", function(req, res) {
  	console.log('%s %s %s', req.method, req.url, req.path);

  	res.sendFile(path + req.path);
	});

  // websocket
  app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

  app.use(express.static("assets"));
  app.use("/", router);
  app.listen(3000, () => console.log("app listening on port 3000!"));
}

/**
 * [zmq_init description]
 * @return {[type]} [description]
 */
function zmq_init() {
  // subscribe
  zmq = require('zeromq')
  sock = zmq.socket('sub');
 
  sock.connect('tcp://localhost:8082');
  
  sock.subscribe("/");
  console.log('Subscriber connected to port 8082');
    
  sock.on('message', function(topic, message) {
    message_handler(topic, message);
  });
};

/**
 * zeromq message handler.
 * broadcast data to websocket.
 * @param  {[type]} topic   [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function message_handler(topic, message) {
  // console.log("Parsed message:", topic.toString(), message.toString());

  j_data = JSON.parse(message);
  var aWss = expressWs.getWss('/');

  // broadcast
  aWss.clients.forEach(function(client) {
    client.send(JSON.stringify(j_data));
  });
}
