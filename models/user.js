const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true,
		enum: ["male", "female", "Male", "Female"]
	}
})
module.exports = mongoose.model("USER", userSchema)