const dotenv = require("dotenv");
const app = require("./src/app");

dotenv.config({
	path: "./.env",
});

/**
 *connect to db
 */

// start server
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Application live at port ${PORT}`);
});
