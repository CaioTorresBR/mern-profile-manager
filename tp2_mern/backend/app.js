/* Express config, middlewares, connexion with mongodb database */
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const { connectDB } = require('./services/mongoose');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); 
app.use(cors());


// connects to mongoDB database, logs error if connection fails
connectDB().catch((err) => console.error("Error connecting to MongoDB:", err));

// Import the user routes
const profilsRoute = require('./routes/profils');
const motdepasseRoute = require('./routes/motdepasse');


app.use('/profils', profilsRoute); // middleware: use the user routes for requests starting with /users
app.use('/motdepasse', motdepasseRoute); // middleware: use the motdepasse routes for requests starting with /motdepasse

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // exports the express app for use in server.js