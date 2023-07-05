import { db } from "../db/db"
import { SendMessage } from "../types"

export const getAllMessagesFromRoom = (roomId: string) => 
    db.Rooms[roomId].Messages;
