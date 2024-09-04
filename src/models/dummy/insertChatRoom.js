const ChatRoom = require('@src/models/ChatRoom');
const esClient = require('@src/config/esClient');

const insertChatMessage = async () => {
    const rooms = await ChatRoom.bulkCreate([
        {
            "chat_room_idx": 1,
            "chat_room_name": "경남김해인제대학사",
            "status": 1,
            "chat_num": 56,
            "created_time": "2024-07-29"
        },{
            "chat_room_idx": 2,
            "chat_room_name": "창원자격증",
            "status": 1,
            "chat_num": 12,
            "created_time": "2024-07-11"
        },{
            "chat_room_idx": 3,
            "chat_room_name": "부산국밥진흥회",
            "status": 2,
            "chat_num": 73,
            "created_time": "2024-07-14"
        },{
            "chat_room_idx": 4,
            "chat_room_name": "인제대예비군",
            "status": 2,
            "chat_num": 5,
            "created_time": "2024-06-21"
        },{
            "chat_room_idx": 5,
            "chat_room_name": "기후경보",
            "status": 4,
            "chat_num": 112,
            "created_time": "2024-08-29"
        },
    ]);
    for(const room of rooms){
        await esClient.index({
            index: 'chat_room',
            id: room.chat_room_idx,
            body: room
        });
    }
    return rooms;
}

module.exports = insertChatMessage;