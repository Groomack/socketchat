let socket = io.connect('http://localhost:4000');

//DOM elements
let btn = document.querySelector('#sendMessage'),
    message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    out = document.querySelector('#output'),
    feedback = document.querySelector('#feedback');

btn.addEventListener('click', () => {
    if (handle.value == '' || message.value == '') {
        return
    } else {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
    }
});
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//Listen event
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    out.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});
socket.on('typing', (data) => {
    feedback.innerHTML = `${data} хуярит сообщение...`;
});