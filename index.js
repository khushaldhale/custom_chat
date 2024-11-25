const express = require("express");
require("dotenv").config();


const { server, app } = require("./socket/socket")


app.use(express.json());
const cookies = require("cookie-parser");
app.use(cookies())
const cors = require("cors");
app.use(cors({
	origin: '*'
}))


app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})


const dbConnect = require("./config/database");
dbConnect()



const authRoutes = require('./routes/authRoute');
app.use("/api/v1/auth", authRoutes)

const messageRoutes = require("./routes/messageRoutes");
app.use("/api/v1/messages", messageRoutes)

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/users", userRoutes)

const PORT = process.env.PORT;


server.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})