const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const token = jwt.sign(
			{
				userId: user._id.toString(),
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.json({
			message: "Login successful",
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				isAdmin: user.isAdmin,
			},
		});
	} catch (error) {
		res.status(500).json({ error: "Login failed" });
	}
});

module.exports = router;