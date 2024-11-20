const ChatMessage = require('../models/ChatMessage');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createChatMessage = async (chatData) => {
    const now = new Date();
    chatData.send_time = now.toISOString();

    const chat = await ChatMessage.create(chatData);

    await esClient.index({
        index: 'chat_message',
        id: chat.chat_idx,
        body: chat
    });

    return chat;
}

exports.getAllChatMessages = async () => {
    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getChatMessagesByIdx = async (chat_idx) => {
    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                term: { chat_idx: chat_idx}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}

exports.getChatMessagesByRoom = async (chat_idx) => {
    const { body } = await esClient.search({
        index: 'chat_message',
        body: {
            query: {
                term: { chat_idx: chat_idx}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}


exports.updateChatMessage = async (chatData) => {
    const now = new Date();

    await ChatMessage.update({
        chat_idx: chatData.chat_idx,
        user_idx: chatData.user_idx,
        chat_room_idx: chatData.chat_room_idx,
        chat_detail: chatData.chat_detail,
        chat_check: chatData.chat_check,
    }, {
        where: {
            chat_idx: chatData.chat_idx,
            user_idx: chatData.user_idx,
            chat_room_idx: chatData.chat_room_idx,
        }
    });

    await esClient.update({
        index: 'chat_message',
        id: chatData.chat_idx,
        body: {
            doc: chatData
        }
    });

    return chatData;
}