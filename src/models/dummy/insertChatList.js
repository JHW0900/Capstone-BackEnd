const ChatList = require('@src/models/ChatList');
const esClient = require('@src/config/esClient');

const insertChatList = async () => {
    const lists = await ChatList.bulkCreate([
        {
            "user_idx": 1,
            "chat_room_idx": 1
        },{
            "user_idx": 1,
            "chat_room_idx": 2
        },{
            "user_idx": 1,
            "chat_room_idx": 3
        },{
            "user_idx": 2,
            "chat_room_idx": 1
        },{
            "user_idx": 2,
            "chat_room_idx": 3
        },{
            "user_idx": 3,
            "chat_room_idx": 2
        },
    ]);
    for(const list of lists){
        await esClient.index({
            index: 'chat_list',
            id: list.user_idx,
            body: list
        });
    }
    return lists;
}

module.exports = insertChatList;