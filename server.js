// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
const dotenv = require("dotenv");
let cors = require("cors");
require("dotenv").config();
const dbUrl = process.env.MONGO_URI;
// Initialize the app
let app = express();

//enables cors
app.use(cors())

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to database
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
mongoose.connection
  .on("connected", () => {
    console.log(`Mongoose connection open on ${dbUrl}`);
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// Setup server port
let port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running server on port " + port);
});
