const mongoose = require("mongoose");



const chatSchema = new mongoose.Schema({
	participants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	}],
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "MESSAGE"
		}
	]
}, {
	timestamps: true
})


module.exports = mongoose.model("CHAT", chatSchema)