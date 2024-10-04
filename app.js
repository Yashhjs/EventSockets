// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const EventEmitter = require("events");
// const path = require("path");

// const emitter = new EventEmitter();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "public")));

// // Handle new connections
// io.on("connection", (socket) => {
//     console.log(`A user connected: ${socket.id}`);

//     // Join a room
//     socket.on("joinRoom", (room) => {
//         socket.join(room);
//         console.log(`${socket.id} joined room: ${room}`);
//     });

//     // Leave a room
//     socket.on("leaveRoom", (room) => {
//         socket.leave(room);
//         console.log(`${socket.id} left room: ${room}`);
//     });

//     // When a client sends a message
//     socket.on("chat message", (data) => {
//         const { msg, room } = data;
//         console.log(`Message received in room ${room}: ${msg}`);

//         // Emit the event through EventEmitter with the message and room
//         emitter.emit("newMessage", { msg, room });
//     });

//     // When a client disconnects
//     socket.on("disconnect", () => {
//         console.log(`A user disconnected: ${socket.id}`);
//     });
// });

// // Listen for newMessage event and broadcast the message to the room
// emitter.on("newMessage", ({ msg, room }) => {
//     console.log(`Broadcasting message to room ${room}: ${msg}`);
//     io.to(room).emit("chat message", msg); // Emit only the message string to the room
// });

// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// //////////////////////////////////////////////////////////////////////////////////////////////////////////



const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Handle socket connection
io.on("connection", (socket) => {
    console.log("A user connected!", socket.id);

    // When a client sends a message
    socket.on("chat message", (msg) => {
        console.log(`Message received:  ${msg} from ${socket.id}`);
        
        // Broadcast the message to all clients, including the sender (if you don't want to send it back to the sender, use socket.broadcast.emit)
        io.emit("chat message", msg);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected!", socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
