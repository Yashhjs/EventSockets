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
