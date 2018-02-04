const User = require('../user/User');

module.exports = function attachUser(socket) {
	socket.user = null;
	socket.on('user.login', (name) => {
		if(typeof name !== 'string') return;

		name = name.slice(0, 10);
		name.replace(/[^A-Za-z0-9-]/g, '');

		if(name.length < 3) name = 'Anon';

		socket.user = new User(name, socket);

		socket.emit('user.login.success');
	});
};
