const messageSchema = require('../models/message');
const chatSchema = require("../models/chat");
const { getSocketId, io } = require('../socket/socket');

exports.sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const sender = req.decode._id;
		const receiver = req.params.id;

		// Validate inputs
		if (!receiver) {
			return res.status(404).json({
				success: false,
				message: "Kindly provide a receiver ID",
			});
		}
		if (!message) {
			return res.status(404).json({
				success: false,
				message: "Kindly provide a message",
			});
		}



		// Check if chat exists between sender and receiver
		let chat = await chatSchema.findOne({ participants: { $all: [sender, receiver] } });



		// If chat doesn't exist, create a new one
		if (!chat) {
			chat = await chatSchema.create({ participants: [sender, receiver] });
		}



		// Create and save the message
		const newMessage = await messageSchema.create({ sender, receiver, message });


		// Add the message to the chat
		chat.messages.push(newMessage._id);
		await chat.save();


		//  now  DB work is  done 
		//  now send message to receiver
		console.log(receiver, getSocketId(receiver))

		const socket_receiver_id = getSocketId(receiver);

		// only  if he is online then send hi message
		if (socket_receiver_id) {
			// real  time message sent
			// io.to(socket_receiver_id).emit("receive_message", message)
			// io.to(socket_receiver_id).emit("receive_message", message)
			console.log("dnymia message sendinggg")
			io.emit("receive_message", message)


		}

		// Send success response
		return res.status(200).json({
			success: true,
			message: "Message is sent successfully",
			data: newMessage,
		});


	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal error occurred",
		});
	}
};



exports.getMessages = async (req, res) => {
	try {
		const userId = req.decode._id;
		const receiverId = req.params.id;

		if (!receiverId) {
			return res.status(404)
				.json({
					success: false,
					message: 'kindly provide an ID '
				})
		}

		//  find the chat where both user and  receiver are present 
		const response = await chatSchema.findOne({ participants: { $all: [userId, receiverId] } }).populate("messages")

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "messages are fetched succesffulyy",
					data: response.messages
				})
		}
		else {
			return res.status(200)
				.json({
					success: true,
					message: "No message  is created yet ",
					data: response
				})

		}

	}
	catch (error) {

		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})

	}
}

