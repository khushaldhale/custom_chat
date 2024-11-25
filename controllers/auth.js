const userSchema = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.signup = async (req, res) => {

	try {

		const { fname, lname, number, password, gender } = req.body;

		if (!fname || !lname || !number || !password || !gender) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all credentials "
				})
		}

		const is_existing = await userSchema.findOne({ number });

		if (is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are already registered , kidly login"
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const response = await userSchema.create({ fname, lname, number, password: hashedPassword, gender })

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "user is registered successfuly",
					data: response
				})
		}
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

exports.signin = async (req, res) => {


	try {
		const { number, password } = req.body;

		if (!number || !password) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide credentials"
				})
		}

		const is_existing = await userSchema.findOne({ number })

		if (!is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are not registerd yet, kindly register first "
				})
		}

		if (await bcrypt.compare(password, is_existing.password)) {

			const token = jwt.sign({
				_id: is_existing._id,
				number: is_existing.number
			}, process.env.JWT_SECRET, {
				expiresIn: "24h"
			})


			return res.cookie("token", token, {
				httpOnly: true,
				// secure: false,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
				// sameSite: "none" 

			})
				.status(200)
				.json({
					success: true,
					message: 'user is logged in ',
					data: is_existing
				})
		}
		else {
			return res.status(404)
				.json({
					success: false,
					message: "password is incorrect"
				})
		}
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}


exports.signout = async (req, res) => {

	try {
		return res.cookie("token", null, {
			httpOnly: true,
			secure: false,
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: "user is logged out succesfully"
			})

	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}