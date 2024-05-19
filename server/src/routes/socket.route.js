const express = require("express");
const router = express.Router();

router.post("/:id", (req, res) => {
	const data = req.body;
	const id = req.params.id;
	console.log("SENDING TO ROOM :: ", id);
	req.io.to(id).emit("receieve_message", { ...data });
	res.json("MESSAGE SENT");
});

module.exports = router;
