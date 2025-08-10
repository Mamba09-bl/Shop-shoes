

  
console.log("hello");

const socket = io()

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