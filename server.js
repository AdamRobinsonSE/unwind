const express = require("express"); // enables express
const app = express(); // enables app
const mongoose = require("mongoose"); // enables mongoose
const passport = require("passport"); // for authentication, 
const session = require("express-session"); // allows our users to stay logged in, uses cookies
const MongoStore = require("connect-mongo")(session); // stores our actual session in mongoDB 
const methodOverride = require("method-override"); // allows us to use PUT and DELETE requests in our forms
const flash = require("express-flash"); // allows us to send flash messages to our users
const logger = require("morgan"); // allows us to log our requests to the console
const connectDB = require("./config/database"); // connects to our database
const mainRoutes = require("./routes/main"); // enables main routes
const postRoutes = require("./routes/posts"); // enables post routes
const commentRoutes = require('./routes/comments'); // enables comment routes

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); // enables dotenv, and uses the .env file in the config folder

// Passport config
require("./config/passport")(passport); // goes to passport.js and passes passport (passport is a function)

//Connect To Database
connectDB(); // calls the connectDB function, found in database.js

//Using EJS for views
app.set("view engine", "ejs"); // sets the view engine to ejs, which is what spits out the html

//Static Folder
app.use(express.static("public")); // this is where we store our static files, like css and images

//Body Parsing
app.use(express.urlencoded({ extended: true })); // allows us to pull data from our forms
app.use(express.json()); // allows us to pull data from our forms

//Logging
app.use(logger("dev")); // logs our requests to the console

//Use forms for put / delete
app.use(methodOverride("_method")); // when you see any type of requests come in with _method, it will override it with the method you specify. We use this incase our client is running in a browser that doesn't support PUT or DELETE requests

// Setup Sessions - stored in MongoDB
app.use( // setting up our session so our user can stay logged in, and specifying we want to store it in mongoDB
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize()); 
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash()); // allows us to send flash messages to our users

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes); // when we go to the root of our website, we will use the mainRoutes
app.use("/post", postRoutes); // when we go to /post, we will use the postRoutes
app.use("/comment", commentRoutes); // when we go to /comment, we will use the commentRoutes

//Server Running
app.listen(process.env.PORT, () => { // starts the server, and listens on the port specified in the .env file
  console.log("Server is running, you better catch it!");
});
