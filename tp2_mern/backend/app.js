/* Express config, middlewares, connexion with mongodb database */

require('dotenv').config();


const express = require('express');
const cors = require('cors');
const { connectDB } = require('./services/mongoose');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

// middleware to parse json bodies of requests
app.use(express.json()); 

// connects to mongoDB database, logs error if connection fails
connectDB().catch((err) => console.error("Error connecting to MongoDB:", err));

// middleware that receives the request and answer as paramaters
app.use((req, res) => {
    res.json({message: 'Server is active'}); // answer with a json object
});

// middleware: use the user routes for requests starting with /users
app.use('/users', userRoutes); 

// middleware: handle requests to /motdepasse/:longueur
app.use('/motdepasse/:longueur', (req, res) => {
	const longueur = parseInt(req.params.longueur);
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
});

module.exports = app; // exports the express app for use in server.js