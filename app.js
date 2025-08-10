const express = require("express")
const app = express()
const index = require("./routers/index")
const userRouter = require("./routers/userRouter")

const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server);
require('dotenv').config();


const path = require("path")
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// require("dotenv").config();
app.use(express.static('public', {
  maxAge: '1y',
  etag: false
}));

app.use("/",index)
app.use("/users",userRouter)

io.on("connection",function(uniquesocket){
    console.log("connected");
    
    // uniquesocket.on("churan",function(){
    //    io.emit("churan paapdi")
    // })
    // uniquesocket.on("hello",function(){
    //     console.log('bye');
        
    // })

    uniquesocket.on("chat message",(data)=>{
console.log("the message was", data.text);
 
io.emit("chat show",data)

    })
})
server.listen(3000)