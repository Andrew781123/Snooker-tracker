const express = require("express");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.use(authUser);
