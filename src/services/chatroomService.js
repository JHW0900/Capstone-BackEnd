const ChatRoom = require('../models/ChatRoom');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createChatRoom = async (chatData) => {
    const now = new Date();
    chatData.created_time = now.toISOString();
    chatData.updated_time = now.toISOString();

    const chat = await ChatRoom.create(chatData);

    await esClient.index({
        index: 'chat_room',
        id: chat.chat_room_idx,
        body: chat
    });

    return chat;
}

exports.getAllChatRooms = async () => {
    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getChatRoomsByIdx = async (chat_room_idx) => {
    const { body } = await esClient.search({
        index: 'chat_room',
        body: {
            query: {
                term: { chat_room_idx: chat_room_idx}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}


exports.updateChatRoom = async (chatData) => {
    const now = new Date();
    chatData.updated_time = now.toISOString();

    await ChatRoom.update({
        chat_room_idx: chatData.chat_room_idx,
        chat_room_name: chatData.chat_room_name,
        status: chatData.status,
        chat_num: chatData.chat_num,
    }, {
        where: {
            chat_room_idx: chatData.chat_room_idx,
            chat_room_name: chatData.chat_room_name
        }
    });

    await esClient.update({
        index: 'chat_room',
        id: chatData.chat_room_idx,
        body: {
            doc: chatData
        }
    });

    return chatData;
}