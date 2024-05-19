const express = require("express");
const router = express.Router();
router.get("", (req, res) => {
	console.log(req.io.id);
	req.io.broadcast.emit("receieve_message", { msg: "from backedn" });
	res.json("MESSAGE SENT");
});

router.post("", (req, res) => {
	const data = req.body;
	req.io.broadcast.emit("receieve_message", { ...data });
	res.json("MESSAGE SENT");
});

module.exports = router;
