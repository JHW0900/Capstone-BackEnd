const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const ChatMessage = sequelize.define('TB_CHAT_MESSAGE', {
    chat_idx:{  //채팅(메세지) 고유 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_idx:{  //유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_room_idx:{  //채팅방 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_detail: { //채팅 내용
        type: DataTypes.STRING(300),
        allowNull: false
    },
    send_time: { //메세지 작성 시간
        type: DataTypes.DATE,
        allowNull: false
    },
    chat_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatMessage;