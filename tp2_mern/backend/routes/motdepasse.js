// inspired by MERN demo code
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

/* Router to generate a password of a specified length */
router.get("/:longueur", (req, res) => {
    const longueur = parseInt(req.params.longueur);
    
    try {
        // considers the length invalid if it's not a number or if it's less than or equal to 0
        if ((!longueur) || longueur <= 0) {
            return res.status(400).json({ message: "Invalid length parameter" });
        } else {
            const password = generateRandomPassword(longueur);
            // returns the generated password in a json object
            res.json({ password });
        }
    } 
    catch (error){
        res.status(500).json({ message: "Connection error" });
    }
});

// generates random password with the given length
function generateRandomPassword(length) {
	const password = [];

	for (let i = 0; i < length; i++) {
		// Generate a random character type (capital letter, number, or special character)
		const isCapital = Math.random();
		const isNum = Math.random();

		// generates a random character based on the type
		if (isCapital > 0.5) {
			// generate a random capital letter (ASCII codes 65-90)
			const char = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
			password.push(char);
		} else if (isNum > 0.5) {
			// generate a random number (ASCII codes 48-57)
			const num = Math.floor(Math.random() * 10);
			password.push(num);
		} else {
            // generate a random lowercase letter
            const char = String.fromCharCode(Math.floor(Math.random() * 26 + 97));
            password.push(char);
        }
    }
	// puts it all together
	return password.join("");
}

module.exports = router; // exports the router to be used in app.js