// inspired by MERN demo code
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

/*Route Parameters

Route parameters are named URL segments that capture values at specific positions in the URL. */

// /POST /users
// Creates a new user with the provided username, email, and password. 
//  hashes the password before saving it to the database and returns the created user without the password in the response.
router.post("/", async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // sends error if there's no username, email, or password in the request
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }
    try {
        // hash the password
        const hashPwd = await bcrypt.hash(password, 12);
        // create a new user
        const newUser = new User({username, email, password: hashPwd});
        // save the new user to the database
        const savedUser = await newUser.save();
        // removes password from user object before sending it back in the response
        const { password: _, ...userData } = savedUser.toObject();
        // 
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error.message});
    }
});

// /GET /users/:id
// Retrieves a user by their ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findBy(req.params.id).select('-password'); // Exclude the password field from the result
        // If no user is found, return a 404 error
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        // If user is found, return the user data 
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Connection error'})
    }
});

// /GET /motdepasse/:longueur

module.exports = router;
