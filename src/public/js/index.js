const socketClient = io();

const chatbox = document.getElementById("chatbox");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", ()=>{
    socketClient.emit("messageKey", chatbox.value);
    chatbox.value="";
});



socketClient.on("messageHistory", (data)=>{
    console.log(data);
});