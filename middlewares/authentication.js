const jwt = require("jsonwebtoken");
require("dotenv").config()



exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token || req.headers.authorization.split(" ")[1];

		if (!token) {
			return res.status(401)
				.json({
					success: false,
					message: 'you are not logged in yet, kindly login '
				})
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET)

		if (decode) {
			req.decode = decode;
			return next()
		}

		return res.status(403)
			.json({
				success: false,
				message: 'invalid token '
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: 'Internal error occured '
			})
	}
}