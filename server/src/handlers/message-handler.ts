import { Server, Socket } from "socket.io";
import { JoinData, MessageData } from "../types";
import { addMessage } from "../services/add-message";



export const messageHandler =  (data: MessageData, io: Server, socket: Socket) => {
    const {nik, roomId, text, userId} = data;
    const timestamp = Date.now();

    const sendData = {
        text,
        userId, 
        nik,
        timestamp,
        messageId: `${timestamp}-${userId}`
    }

    addMessage(roomId, sendData);
    io.to(roomId).emit('response', sendData);

    console.log('socket.id', socket.id, {roomId, text, userId})
}