
module.exports = {
  init: init
};

var zmq;
var sock;
var sample;

function init() {
  // subscribe
  zmq = require('zeromq')
  sock = zmq.socket('sub');
 
  sock.connect('tcp://localhost:8082');
  
  sock.subscribe("/");
  console.log('Subscriber connected to port 8082');
  
  sampel = "Good";
  
  sock.on('message', function(topic, message) {
    message_handler(topic, message);
  });
};

function message_handler(topic, message) {
  //console.log('received a message related to:', topic, 'containing message:', message);
  console.log("Parsed message:", topic.toString(), message.toString());
}
