const socket = io()
console.log("chat.js loaded");
console.log("chat.js updated", Date.now());


let nameservice = prompt("Enter your name:")

document.querySelector("button").onclick = () =>{
    const  message = document.querySelector("input").value
    socket.emit("chat message",{
        text:message,
        username : nameservice,
         
    })
    document.querySelector("input").value = ""
}
socket.on('chat show',(data)=>{
const chatBox = document.querySelector("#chat");
chatBox.innerHTML += `<p><strong>${data.username}:</strong> ${data.text}</p>`;
})

socket.on("chat history", (messages) => {
    const chatBox = document.querySelector("#chat");
    chatBox.innerHTML = ""; // 🔹 clear before adding
    messages.forEach(msg => {
        chatBox.innerHTML += `<p><strong>${msg.username}:</strong> ${msg.text}</p>`;
    });
    console.log(msg.username);
    console.log(msg.text);

    

});


