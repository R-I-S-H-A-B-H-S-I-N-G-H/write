exports.appendSocket = (socket) => (req, res, next) => {
	req.io = socket;

	next();
};
