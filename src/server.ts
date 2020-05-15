import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socket(server);


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});


// TODO
io.origins(['*']);
//io.origins('*:*') 
//io.origins('*')
//io.set('origins', '*:*');


interface MessageInterface {
  author: string
  date: Date
  content: string
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (message: MessageInterface) => {
    console.log(`${message.author} says: ${message.content}`);
    io.emit('chat message', message);
  });
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});