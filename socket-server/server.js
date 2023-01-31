const express = require('express')
const cors  = require('cors')
const app = express();
const http = require('http')
const {Server}= require('socket.io')
const server = http.createServer(app)


app.use(cors())
const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3003',
    methods: 'GET, POST, PUT, DELETE',
  }
})
io.on("connection",(socket)=>{
  console.log(`User connected: ${socket.id}`);

  socket.on("send_code_real_time",(data)=>{
    socket.broadcast.emit("receive_code",data)
  })

})
server.listen(3002, ()=>{
  console.log('Server is Running');
})