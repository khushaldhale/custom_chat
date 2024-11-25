const userSchema = require("../models/user");



exports.getChatUsers = async (req, res) => {
	try {

		const userId = req.decode._id;

		const response = await userSchema.find({ _id: { $ne: userId } });
		return res.status(200)
			.json({
				success: true,
				message: "all users are fetched succesfully",
				data: response
			})
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occurs "
			})
	}
}