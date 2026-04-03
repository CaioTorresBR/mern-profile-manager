require("dotenv").config();

const mongoose = require("mongoose");

// connect to mongodb database
async function connectDB() {
	await mongoose.connect(process.env.MONGODB_URL);
	console.log("Connexion to MongoDB successful");
}

module.exports = { connectDB };
