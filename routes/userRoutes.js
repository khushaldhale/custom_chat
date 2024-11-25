const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { getChatUsers } = require("../controllers/user");
const router = express.Router();



router.get("/", authentication, getChatUsers)

module.exports = router