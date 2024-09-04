const ChatList = require('../models/ChatList');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createChatList = async (chatData) => {
    const now = new Date();
    const chat = await ChatList.create(chatData);

    await esClient.index({
        index: 'chat_list',
        id: chat.user_idx,
        body: chat
    });

    return chat;
}

exports.getAllChatLists = async () => {
    const { body } = await esClient.search({
        index: 'chat_list',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getChatListsByIdx = async (chatData) => {
    const { body } = await esClient.search({
        index: 'chat_list',
        body: {
            query: {
                term: { user_idx: chatData.user_idx}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}


exports.updateChatList = async (chatData) => {
    const now = new Date();

    await ChatList.update({
        user_idx: chatData.user_idx,
        chat_room_idx: chatData.chat_room_idx,
    }, {
        where: {
            user_idx: chatData.user_idx,
            chat_room_idx: chatData.chat_room_idx,
        }
    });

    await esClient.update({
        index: 'chat_list',
        id: chatData.user_idx,
        body: {
            doc: chatData
        }
    });

    return chatData;
}