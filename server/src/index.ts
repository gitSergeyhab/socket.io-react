import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

import { router } from './routers';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const server = new http.Server(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
});

const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'files', 'images')))



app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);


type Data = { id: string, name: string };

type JoinData = { user: Data, room: Data };

type MessageData = {
    userId: string;
    roomId: string;
    nik: string;
    text: string;
}

io.on('connection', (socket) => {
    socket.on('join', (data: JoinData) => {
        const roomId = data.room.id
        socket.join(roomId);
        const timestamp = Date.now()
        const sendData = {
            isJoin: true, 
            text: `user ${data.user.name} joined to room`,
            userId: data.user.id, 
            nik: data.user.name,
            timestamp,
            messageId: `${timestamp}-${data.user.id}`
        }
        console.log({sendData}, 'join');
        
        socket.to(roomId).emit('response', sendData);
    });


    socket.on('message', (data: MessageData) => {
        const {nik, roomId, text, userId} = data;
        const timestamp = Date.now();

        const sendData = {
            text,
            userId, 
            nik,
            timestamp,
            messageId: `${timestamp}-${userId}`
        }

        io.to(roomId).emit('response', sendData);
    })

    socket.on('leave', (data) => console.log({data}, 'leave'))
    console.log(socket.id, '____socket___ => connection <=');

    // socket.on('add-user', (data) => addUserHandler(io, data))
    socket.on('disconnect', () => {
        console.log(socket.id, '____socket___ => DISconnect <=');
    })
    
})

const start = async() => {
    try {
        server.listen(port, () => console.log(`SERVER started on PORT :  ${port}`))
        // app.listen(port, () => console.log(`SERVER started on PORT :  ${port}`));
    } catch (err) {
        console.log(' -- Start Server Error: ')
        console.log(err)
    }
}

start();