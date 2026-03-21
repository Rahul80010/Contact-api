const { Server } = require('socket.io');

let io;
const userSocketMap = {}; // { userId: socketId }

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log("A user connected:", socket.id);

        const userId = socket.handshake.query.userId;
        if(userId && userId !== "undefined") {
            userSocketMap[userId] = socket.id;
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            if(userId) {
                delete userSocketMap[userId];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const getIo = () => {
    return io;
};

module.exports = { initSocket, getReceiverSocketId, getIo };
