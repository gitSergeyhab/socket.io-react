import { db } from "../db/db"
import { SendMessage } from "../types"

export const addMessage = (roomId: string, message: SendMessage) => {
    db.Rooms[roomId].Messages.push(message);
}