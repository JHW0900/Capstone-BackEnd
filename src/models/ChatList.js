const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const ChatList = sequelize.define('TB_CHAT_LIST', {
    user_idx:{  //유저 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_room_idx:{  //채팅방 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = ChatList;