// inspired by MERN demo code
const { authenticate, isAdmin, isOwnerOrAdmin } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

/*Route Parameters

Route parameters are named URL segments that capture values at specific positions in the URL. */

// Helper function to validate email with Zeruh API
const validateEmailWithZeruh = async (email) => {
	const url = `https://api.zeruh.com/v1/verify?api_key=${process.env.EMAIL_API_KEY}&email_address=${encodeURIComponent(email)}`;
	const verifyResponse = await fetch(url);
	const verifyData = await verifyResponse.json();
	console.log("Zeruh response:", verifyData);

	const emailStatus = verifyData.result?.status;

	if (emailStatus !== "deliverable") {
		throw new Error("Please enter a valid email address.");
	}

	console.log("Email is valid");
};

// /POST /users
// Creates a new user with the given username, email, and password.
//  hashes the password before saving it to the database and returns the created user without the password in the response.
router.post("/", async (req, res) => {
	// Extract username, email, and password from the request body
	const { username, email, password ,isAdmin } = req.body;

	// sends error if there's no username, email, or password in the request
	if (!username || !email || !password) {
		return res
			.status(400)
			.json({ error: "Username, email, and password are required." });
	}
	try {
		// Validate email with Zeruh API
		await validateEmailWithZeruh(email);
		
		// hash the password
		const hashPwd = await bcrypt.hash(password, 12);
		// create a new user
		const newUser = new User({ username, email, password: hashPwd , isAdmin: isAdmin || false });
		// save the new user to the database
		const savedUser = await newUser.save();
		// removes password from user object before sending it back in the response
		const { password: _, ...userData } = savedUser.toObject();
		//
		res.status(201).json(userData);

	} catch (error) {
		// Handle email validation errors
		if (error.message === "Please enter a valid email address.") {
			return res.status(400).json({ error: "Please enter a valid email address." });
		}
		// Source: https://stackoverflow.com/questions/18032879/mongodb-difference-between-error-code-11000-and-11001
		// Treating the case with the same email in 2 different accounts
		if(error.code === 11000 ||error.message.includes("expected `email` to be unique")){
			return res.status(400).json({
				error:"This email is already associated with another account."
			})
		}
		if(error.message.includes("expected `username` to be unique")){
			return res.status(400).json({
				error:"This username is already taken."
			})
		}
		res
			.status(500)
			.json({ message: "We could not create the user. Please try again." });
	}
});

// /GET /users/:id
// Retrieves a user by their ID
router.get("/:id",authenticate, isOwnerOrAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password"); // Exclude the password field from the result
		// If no user is found, return a 404 error
		if (!user) {
			return res.status(404).json({ message: "No user was found with this ID." });
		}
		// If user is found, return the user data
		res.json(user);
	} catch (error) {
		res.status(400).json({ message: "Please enter a valid user ID." });
	}
});

// Read all only for admin
router.get("/",authenticate, isAdmin, async (req, res) => {
    try{
		const users = await User.find().select("-password")
		res.json(users)
	}catch(error){
		res.status(500).json({message : "We could not load the users. Please try again."})
	}

});
// /PUT /users/:id
// Updates a user by their ID with the given username, email, and password.
router.put("/:id", authenticate,isOwnerOrAdmin, async (req, res) => {
	// Extract username, email, and password from the request body
	const { username, email, password } = req.body;

	// handles error if there's no username or email in the request
	if (!username || !email) {
		return res
			.status(400)
			.json({ error: "Username and email are required." });
	}

	try {
		// Validate email with Zeruh API
		await validateEmailWithZeruh(email);
		
        const updateData = {};
        
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 12);

        // find the user by ID and update it with the new data, returning the updated user without the password
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true },
        ).select("-password");


        if (!user) {
            return res.status(404).json({ message: "No user was found with this ID." });
        }

		res.status(200).json(user);

	} catch (error) {
		// Handle email validation errors
		if (error.message === "Please enter a valid email address.") {
			return res.status(400).json({ error: "Please enter a valid email address." });
		}
		if(error.code === 11000 ||error.message.includes("expected `email` to be unique")){
			return res.status(400).json({
				error:"This email is already associated with another account."
			})
		}
		if(error.message.includes("expected `username` to be unique")){
			return res.status(400).json({
				error:"This username is already taken."
			})
		}
		res.status(500).json({ message: "We could not update the user. Please try again." });
	}
});

// /DELETE /users/:id
// Only admins can delete someone
router.delete("/:id",authenticate,isAdmin,  async (req, res) => {
	try {
        // find the user by ID and delete it from the database
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if(!deletedUser){
			return res.status(404).json({message: "No user was found with this ID."})
		}
		return res.status(200).json({message: "User deleted successfully."})

	} catch (error) {
        res.status(400).json({ message: "Please enter a valid user ID." });
    }
});

// /GET /motdepasse/:longueur

module.exports = router;
