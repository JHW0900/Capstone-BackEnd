"use strict" //strict mode 사용
const socket = io(); //client의 socket.io

const userIDX = document.querySelector("#user_idx") //사용자 idx
const roomIDX = document.querySelector("#room_idx") //채팅방 idx
const chatList = document.querySelector(".chatting_list") //채팅 리스트 화면
const chatInput = document.querySelector(".chatting_input") // 입력창
const sendButton = document.querySelector(".send-button") // 전송 버튼
const displayContainer = document.querySelector(".display-container");

function sendMessage(){
    const chatTemp = {
        id: userIDX.value,
        msg: chatInput.value,
        room: roomIDX.value
    }
    socket.emit("chatting", chatTemp) //데이터 보내기 (사용자 id, 메세지)
    chatInput.value="";
}

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode ===13){
        sendMessage();
    }
})

sendButton.addEventListener("click", sendMessage)

socket.on("chatting", (data)=>{ //서버로 보낸 data를 다시 돌려받음
    //const chat = document.createElement("chat")  //chatList에 추가할 메세지
    //chat.innerText = `${data.id}님: ${data.msg}\n`;
    //chatList.appendChild(chat)   //chatList에 채팅 추가
    const item = new chatListAppend(data.id, data.msg, data.room, data.time);
    item.makeChat();
}) //데이터 받기

function chatListAppend(id, msg, room, time){
    this.id = id;
    this.msg = msg;
    this.room = room;
    this.time = time;

    this.makeChat = ()=>{
        const chat = document.createElement("li");
        chat.classList.add(userIDX.value === this.id ? "send" : "receive")
        const dom = `
            <span class="profile">
                <span class="user">${this.id}</span>
                <img class="image" src="../goodone.png" alt="good image">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>
        `;

        chat.innerHTML=dom;
        chatList.appendChild(chat);
        displayContainer.scrollTop = displayContainer.scrollHeight;
    }
}