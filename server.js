const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI;
// Initialize the app
const app = express();

// Import routes
let apiRoutes = require("./api-routes")


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to database
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

//var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express & Vercel'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running server on port " + port);
});
