import { Server, Socket } from "socket.io";
import { JoinData } from "../types";
import { addMessage } from "../services/add-message";



export const leaveHandler =  (data: JoinData, io: Server, socket: Socket) => {
    const roomId = data.room.id
    socket.leave(roomId);
    const timestamp = Date.now()
    const sendData = {
        isAuto: true, 
        text: `user ${data.user.name} left this room`,
        userId: data.user.id, 
        nik: data.user.name,
        timestamp,
        messageId: `${timestamp}-${data.user.id}`
    }
    // console.log({sendData}, 'leave');
    
    socket.to(roomId).emit('response', sendData);
    addMessage(roomId, sendData)
}