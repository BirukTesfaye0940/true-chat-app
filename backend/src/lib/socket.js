import { Server } from 'socket.io'
import http from 'http';
import express from 'express'
import { Socket } from 'dgram';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    
    const userId = socket.handshake.query.userId;

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    if (userId) userSocketMap[userId] = socket.id
    socket.on("disconnect", () => {
        console.log("A user is disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {io, app, server};