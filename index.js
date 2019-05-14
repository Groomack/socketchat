let express = require('express');
let app = express();
let server = app.listen(4000, () => {
    console.log('listening on port 4000...');
});

app.use(express.static('public'));

//Socket
let socket = require('socket.io');
let io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    });
});