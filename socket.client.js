const { io } = require('socket.io-client');

const socket = io("ws://localhost:3000");


socket.emit("client-message", "Hello");

socket.on('server-message', (data) => {
  console.log('Server says ', data);
})

socket.join("room");
