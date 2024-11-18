"use strict" //strict mode 사용
const socket = io(); //client의 socket.io

const userIDX = document.querySelector("#user_idx") //사용자 idx
const roomIDX = document.querySelector("#room_idx") //채팅방 idx
const chatList = document.querySelector(".chatting_list") //채팅 리스트 화면
const chatInput = document.querySelector(".chatting_input") // 입력창
const sendButton = document.querySelector(".send-button") // 전송 버튼
const enterButton = document.querySelector(".enter-room") // 입장 버튼
const displayContainer = document.querySelector(".display-container");

function sendMessage(){ // 채팅 입력
    const chatTemp = {
        id: userIDX.value,
        msg: chatInput.value,
        room: roomIDX.value,
        time: new Date(),
    }
    socket.emit("chatting", chatTemp) //데이터 보내기 (사용자 id, 메세지)
    chatInput.value=""; //입력완료 후 input 초기화 시키기
}
function enterRoom(){ //방 입장
    const chatTemp = {
        id: userIDX.value, //사용자 아이디
        //msg: chatInput.value,
        room: roomIDX.value, //들어갈 방
        time: new Date(),  //입장시간
    }
    socket.emit("enter_room", chatTemp)
}

chatInput.addEventListener("keypress", (event)=>{ //enter로 메세지 입력
    if(event.keyCode ===13){
        sendMessage();
    }
})

sendButton.addEventListener("click", sendMessage)
enterButton.addEventListener("click", enterRoom)

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
    this.time = new Date(time).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true });

    this.makeChat = ()=>{
        const chat = document.createElement("li");
        chat.classList.add(userIDX.value === this.id ? "send" : "receive")  //내가 보낸건지, 다른사람이 보낸건지 확인
        const dom = `
            <span class="profile">
                <span class="user">${this.id}</span>
                <img class="image" src="../goodone.png" alt="good image">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>
        `;//입력받거나 입력해서 다시 돌아온 메세지를 채팅리스트 html에 맞게 코드를 짜서 저장

        chat.innerHTML=dom;
        chatList.appendChild(chat); //완성된 메세지 html 추가하기
        displayContainer.scrollTop = displayContainer.scrollHeight; //메세지 추가후 최하단으로 스크롤이동
    }
}