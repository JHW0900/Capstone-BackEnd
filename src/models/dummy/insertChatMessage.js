const ChatMessage = require('@src/models/ChatRoom');
const esClient = require('@src/config/esClient');

const insertChatRoom = async () => {
    const msgs = await ChatMessage.bulkCreate([
        {
            "chat_idx":1,
            "user_idx":1,
            "chat_room_idx": 1,
            "chat_detail": "아 제발;;",
            "send_time": "2024-07-29"
        },{
            "chat_idx":2,
            "user_idx":1,
            "chat_room_idx": 2,
            "chat_detail": "다음?",
            "send_time": "2024-07-29"
        },{
            "chat_idx":3,
            "user_idx":2,
            "chat_room_idx": 3,
            "chat_detail": "그때 뵙죠.",
            "send_time": "2024-07-29"
        },{
            "chat_idx":4,
            "user_idx":2,
            "chat_room_idx": 4,
            "chat_detail": "수고하셨습니다!",
            "send_time": "2024-07-29"
        },{
            "chat_idx":5,
            "user_idx":4,
            "chat_room_idx": 5,
            "chat_detail": "이번에 못할 것 같습니다. 죄송합니다.",
            "send_time": "2024-07-29"
        },
    ]);
    for(const msg of msgs){
        await esClient.index({
            index: 'chat_message',
            id: msg.chat_idx,
            body: msg
        });
    }
    return rooms;
}

module.exports = insertChatRoom;