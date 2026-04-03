
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*Route Parameters

Route parameters are named URL segments that capture values at specific positions in the URL. */

// /GET /motdepasse/:longueur
router.get
