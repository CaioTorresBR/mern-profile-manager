// inspired by MERN demo code
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

/*Route Parameters

Route parameters are named URL segments that capture values at specific positions in the URL. */

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
			.json({ error: "Username, email, and password are required" });
	}
	try {
		// Validation of the email with the API from Mailero
		const url = `https://api.zeruh.com/v1/verify?api_key=${process.env.EMAIL_API_KEY}&email_address=${email}`;
		// Fetches the response from the API and logs it to the console
		const verifyResponse = await fetch(url);
		// Parses the response as JSON and logs it to the console
		const verifyData = await verifyResponse.json();
		console.log("Zeruh response:", verifyData);

		const emailStatus = verifyData.result?.status;

		// Verifies if the email is invalid
		if (emailStatus != "deliverable") {
			return res.status(400).json({error: "The email is invalid"});
		} else {
			console.log("Email is valid");
		}
		
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
		// Source: https://stackoverflow.com/questions/18032879/mongodb-difference-between-error-code-11000-and-11001
		// Treating the case with the same email in 2 different accounts
		if(error.code === 11000 ||error.message.includes("expected `email` to be unique")){
			return res.status(400).json({
				error:"Email already exist"
			})
		}
		res
			.status(500)
			.json({ message: "Error creating user", error: error.message });
	}
});

// /GET /users/:id
// Retrieves a user by their ID
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password"); // Exclude the password field from the result
		// If no user is found, return a 404 error
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// If user is found, return the user data
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Connection error" });
	}
});

// Read all
router.get("/", async (req, res) => {
    try{
		const users = await User.find().select("-password")
		res.json(users)
	}catch(error){
		res.status(500).json({message : "Connection error"})
	}

});
// /PUT /users/:id
// Updates a user by their ID with the given username, email, and password.
router.put("/:id", async (req, res) => {
	// Extract username, email, and password from the request body
	const { username, email, password } = req.body;

	// handles error if there's no username, email, or password in the request
	if (!username || !email || !password) {
		return res
			.status(400)
			.json({ error: "Username, email, and password are required" });
	}

	try {
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
            return res.status(404).json({ message: "User not found" });
        }

		res.status(200).json(user);

	} catch (error) {
		res.status(500).json({ message: "User update error" });
	}
});

// /DELETE /users/:id
router.delete("/:id", async (req, res) => {
	try {
        // find the user by ID and delete it from the database
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if(!deletedUser){
			return res.status(500).json({message: "User not found"})
		}
		return res.status(200).json({message: "User deleted"})

	} catch (error) {
        res.status(500).json({ message: "User deletion error" });
    }
});

// /GET /motdepasse/:longueur

module.exports = router;
