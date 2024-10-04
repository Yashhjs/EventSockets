const express = require("express");
const http = require("http");
const {Server} = require("socket.io")
const EventEmitter= require("events");
const path = require("path");

const event = new EventEmitter();

const app =  express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket)=>{
    console.log(`A new User connected with socket ID : ${socket.id}`);
    socket.on("joinRoom", (room)=>{
        socket.join(room);
        console.log(`${socket.id} joined  room ${room}`);        
    });

    socket.on("leaveRoom", (room)=>{
        socket.leave(room);
        console.log(`${socket.id} left the room ${room}`);
    });

    socket.on("chat message", (data)=>{
        const {message, room, isBroadcast} = data;
        console.log(`message recieved in room ${room} : ${message}`);
        event.emit("newMessage", {message, room, isBroadcast});
    });

    socket.on("disconnect", ()=>{
        console.log(`user Disconnected : ${socket.id}`);
    })

})


event.on("chat message", ({message, room, isBroadcast})=>{
    if(isBroadcast){
        console.log(`Message  is broadcasted to all rooms`);
        io.emit("chat message", msg);
    }else{
        console.log(`message from ${socket.id} in room ${room} :  ${message}`);
        io.to(room).emit("Group Chat ", message);
        
    }

})

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
})