const socket = io('http://localhost:8000');

// get dom elements in repective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// audio will play on receiving messages
var audio = new Audio('ding.mp3');

// function which will append event info to the container
const append = (message,position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }   
}

// ask new user for name and let server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

// if new user joins, receive event from server
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left')
})

// if server sends a message,receive it
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left')
})
// if a user leaves the chat,other knows
socket.on('left',name =>{
    append(`${name} left the chat`,'left')
})

// if form gets submitted,send message to server
form.addEventListener('submit',(e)=>{
    e.preventDefault();// prevents reloading page
    const message = messageInput.value;
    append(`${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''
})