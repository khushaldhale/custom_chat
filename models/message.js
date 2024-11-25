const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	},
	message: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("MESSAGE", messageSchema)