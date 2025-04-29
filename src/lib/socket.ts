import { Server } from "socket.io";
import http from "http";
import app from "../app";  // Import the configured app

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

interface UserSocketMap {
    [key: string]: string;
}
export function getReceiverSocketId(userId: string) {
    return userSocketMap[userId];
}
//used to store online users
const userSocketMap:UserSocketMap = {}; // { userId: socketId }
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    const  userId  = socket.handshake.query.userId
    if (typeof userId === 'string') {  // Type guard to ensure userId is a string
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (typeof userId === 'string') {  // Type guard to ensure userId is a string
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});



export { io, server };