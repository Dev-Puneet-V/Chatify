const auth = require('./auth.service');
const socket = require('./socket.service');

module.exports = {
    authService: auth,
    socketService: socket
}