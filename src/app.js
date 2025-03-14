const express = require('express');
const logger = require("./config/winston/logger");
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const sequelize = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger-output");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', true);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// set up routes
app.use('/api', routes);

///////////////////socket.io chat구현 -시작-///////////////////////
const http = require("http");
const server_chat = http.createServer(app); //http로 app실행
const { Server } = require("socket.io") //socket.io 사용
const io = new Server(server_chat, {
    cors: {
        origin: "*", // 모든 도메인에서 접근 가능하도록 설정
    },
}); //열어놓은 8282포트의 서버의 메세지 io로 전송

//app.use(express.static(path.join(__dirname, "views")));  //express.static() -지정한 폴더 src에서 자동으로 index가져감
// 하위폴더 public이 있다면 path.join(__dirname, "public") 사용
const PORT_CHAT = 8282; // 채팅을 위한 포트
server_chat.listen(PORT_CHAT, "0.0.0.0", () => {
    console.log(`Chat server is fine on port ${PORT_CHAT}`);
});

io.on("connection", (socket)=>{ //서버에 연결
    socket.on("enter_room",(data)=>{ //방 입장 통신
        console.log(socket.rooms);
        socket.join(data.room); // 입장 통신의 데이터에서 room번호를 받아 입장 또는 방 생성
        socket.on("chatting", (data)=>{  // 서버가 데이터(data)를 받음
            //io.emit("chatting", data) //데이터를 ["모든"]client에게 전송
            io.to(data.room).emit("chatting", data);
        })
    })
    /*
    socket.on("chatting", (data)=>{  // 서버가 데이터(data)를 받음
        io.emit("chatting", data) //데이터를 client에게 전송
    })
    */
})
///////////////////socket.io chat구현 -끝-///////////////////

// Authenticate the database connection
sequelize.authenticate().then(() => {
    logger.info('Database connection has been established successfully.');
  }).catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = app;