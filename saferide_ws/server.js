const http = require('http');
const { Server } = require('socket.io');
const tunnelmole = require('tunnelmole/cjs');


const server = http.createServer();

let ownerId


const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (replace with your client URLs in production)
  },
});

io.on('connect', (socket) => {
  console.log('👤 A user connected:', socket.id);

  // // Relay audio chunks from React Native to Next.js
  // socket.on('audio chunk', (chunk) => {
  //   io.emit('audio chunk', chunk); // Broadcast to all clients (or specific clients)
  // });




  // Relay location from React Native to Next.js
  socket.on('location', (location) => {
    
    console.log('RECIEVED ◀ ', location)

    io.emit('location', location); // Broadcast to all clients (or specific clients)
    console.log('SENT ▶ ', location)
  });

  socket.on('authorize', (authorizeBool) => {
    let ownerId = socket.id
    console.log('authorized from', socket.id)
  })





  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });



});


const StartTunnelmole = async () => {
  const url = await tunnelmole({
    port: 4000
  });
}



server.listen(4000, () => {
  console.log('Socket.IO server is running on http://localhost:4000');
  StartTunnelmole()
});