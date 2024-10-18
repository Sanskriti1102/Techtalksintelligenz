const express = require("express");
const { SendEmail } = require("./controller");
const EmailRoutes = express.Router();

EmailRoutes.post("/SendEmail", SendEmail);

module.exports = { EmailRoutes };
