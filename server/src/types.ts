export type Data = { id: string, name: string };

export type JoinData = { user: Data, room: Data };

export type MessageData = {
    userId: string;
    roomId: string;
    nik: string;
    text: string;
}



export type SendMessage = {
    isAuto?: boolean, 
    text: string,
    userId: string, 
    nik: string,
    timestamp: number,
    messageId: string
}