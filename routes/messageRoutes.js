const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { sendMessage, getMessages } = require("../controllers/message");
const router = express.Router();


router.post("/send/:id", authentication, sendMessage);
router.get("/:id", authentication, getMessages);

module.exports = router