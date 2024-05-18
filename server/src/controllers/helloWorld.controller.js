const { getHello } = require("../services/helloWorld.service");

exports.get = async (req, res, next) => {
	res.json(getHello(req.query.msg));
};
