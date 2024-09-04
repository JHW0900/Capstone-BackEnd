const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const ChatRoom = sequelize.define('TB_CHAT_ROOM', {
    chat_room_idx:{  //채팅방 고유 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chat_room_name:{ //채팅방 이름
        type: DataTypes.STRING(25)
    },
    status:{ //마지막 채팅 작성자
        type: DataTypes.INTEGER
    },
    chat_num:{ //채팅방 메세지 개수
        type: DataTypes.INTEGER
    },
    created_time: {  //등록날짜
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatRoom;