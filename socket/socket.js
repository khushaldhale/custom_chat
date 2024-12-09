const express = require("express");
const app = express();
const { Server } = require("socket.io")
const { createServer } = require("http");

const server = createServer(app);


const io = new Server(server, {
	cors: {
		origin: "*"
	}
})


//  maintain the onlineusers list 


//   emit the event from the frontend and listen to that in api 
//  and  do work accordingly 


//  and  this is not an effeiceint way as we are using http here , we shoudl be doing an 
//  websockets only 


//  why do we use wesockets , refer to image captured in mobile
//  and optimize the codde

//  also write the function to get the socket id on the basis of userid , means user logged in 


// function  to get the socket id of the users 

const getSocketId = (reciverId) => {
	return onlineUsers[reciverId]
}

const onlineUsers = {}
io.on("connection", (socket) => {


	socket.on("error", (err) => {
		// if  any error occurs that will be logged here 
		console.error("Socket.IO Error:", err);
	});

	//  online users mapped 
	if (socket.handshake.query.userId) {
		const userId = socket.handshake.query.userId
		//  setting up the online users 
		onlineUsers[userId] = socket.id
		console.log("new user is connected : ", socket.id, onlineUsers[userId])
		console.log("all users: ", onlineUsers)

	}


	socket.on("disconnect", () => {
		for (let key in onlineUsers) {
			if (onlineUsers[key] === socket.id) {
				console.log("user disconnected : ", onlineUsers[key])

				delete onlineUsers[key];
			}
		}

	})


})

module.exports = { io, app, server, getSocketId }
