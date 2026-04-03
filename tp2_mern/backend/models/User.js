// Schema for User model

const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator").default;

// Define the User schema with fields for username, email, and password
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email:    { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		//the collection name
		collection: "users",
	},
);

userSchema.plugin(mongooseUniqueValidator);

// exports the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
