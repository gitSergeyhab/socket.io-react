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
import { joinHandler } from './handlers/join-handler';
import { JoinData, MessageData } from './types';
import { messageHandler } from './handlers/message-handler';
import { leaveHandler } from './handlers/leave-handler';

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


io.on('connection', (socket) => {
    console.log(socket.id, '____socket___ => connection <=');
    socket.on('join', (data: JoinData) => joinHandler(data, io, socket) );
    socket.on('message', (data: MessageData) => messageHandler(data, io, socket))
    socket.on('leave', (data: JoinData) => leaveHandler(data, io, socket))
    
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