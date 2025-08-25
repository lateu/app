

// Load  variables from .env
require("dotenv").config(); 

const express = require("express");
const app = express();


// Get port from .env
const PORT = process.env.PORT || 3000;

//import routes
var messageRoute = require('./routes/messageRoutes');

// Define Routes
app.use('/message', messageRoute);


// Middleware to parse JSON requests
app.use(express.json());

// Enable cors at the server side. 
const cors = require('cors')
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));


// POST greeting message route
app.post("/saveMessage", (req, res) => {
  res.json({
    message: "You sent:",
    data: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});