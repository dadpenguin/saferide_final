const { io } = require("socket.io-client");


// const socket = io("ws://192.168.1.14:4000")
const socket = io("ws://localhost:4000")

// 11.612190
// 125.432920






socket.on("connect", () => {
    console.log("Connected:", socket.connected); // true



    // // submit message
    // setTimeout(()=>{

    //   socket.emit('location', {latitude: 11.612190,longitude: 125.432920})

    // } ,3000)

  });

// socket.on('location', (location) => {
//   console.log('server sent:', location)

// })

socket.on("connect_error", (err) => {
console.log("Connection error:", err.message);
});