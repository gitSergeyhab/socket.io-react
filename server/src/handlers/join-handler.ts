import { Server, Socket } from "socket.io";
import { JoinData } from "../types";
import { getAllMessagesFromRoom } from "../services/get-all-messages-from-room";
import { addMessage } from "../services/add-message";



export const joinHandler =  (data: JoinData, io: Server, socket: Socket) => {
    const roomId = data.room.id
    socket.join(roomId);
    const timestamp = Date.now()
    const sendData = {
        isAuto: true, 
        text: `user ${data.user.name} joined to this room`,
        userId: data.user.id, 
        nik: data.user.name,
        timestamp,
        messageId: `${timestamp}-${data.user.id}`
    }
    // console.log({sendData}, 'join');
    
    socket.to(roomId).emit('response', sendData);

    const allMessages = getAllMessagesFromRoom(roomId);
    
    // console.log({allMessages})
    socket.emit('response_all_messages', allMessages)
    addMessage(roomId, sendData);
}