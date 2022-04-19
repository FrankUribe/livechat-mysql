const cors = require("cors");
const express = require("express");
const mysql = require('mysql');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const resrapRoutes = require("./routes/resrapidRoutes");
const scheduleRoutes = require("./routes/schedulesRoutes");
const app = express();
const socket = require("socket.io")
const bodyParser = require('body-parser')
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livechat'
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('DB conected!');
});

app.get('/', (req, res) => {
  res.send('LiveChat CCIP API')
})

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/resrapid", resrapRoutes)
app.use("/api/schedules", scheduleRoutes)

const server = app.listen(process.env.PORT,()=>{
  console.log(`Dev server on: ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });

  socket.on("setActiveUser", () => {
    io.emit("activeUser");
  });
});