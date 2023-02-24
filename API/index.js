// Import necessary libraries
const express = require("express"); // Framework to create a REST API
const app = express(); // Create an instance of the express application
const mongoose = require("mongoose"); // Library for connecting to MongoDB
const helmet = require("helmet"); // Library for setting HTTP headers to improve security
const morgan = require("morgan"); // Library for logging HTTP requests
const dotenv = require("dotenv"); // Library for loading environment variables
const userRouter = require("./routes/users"); // User routes
const authRouter = require("./routes/auth"); // Authentication routes
const postRoute = require("./routes/posts"); // Post routes
const path = require('path'); // Library for working with file and directory paths
const multer = require("multer"); // Library for handling file uploads
const fs = require('fs'); // Library for working with the file system

// Load environment variables from a .env file
dotenv.config();

// Connect to MongoDB using the URL stored in the environment variable
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
        console.log("connected to Mongo")
    }
);

// Set up middleware to parse JSON data and log HTTP requests
app.use(express.json());
app.use(morgan("common"));

// Set up middleware to set HTTP headers for improved security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "blob:"]
    }
  }
}));

// Set up routes for users, authentication, and posts
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);

// Set up multer middleware for handling file uploads and set the file storage location and name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/assets");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

// Set up route to handle file uploads and return the filename
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      const fileName = req.file.filename;
      return res.status(200).json({ fileName });
    } catch (error) {
      console.error(error);
    }
});

// Serve static files (e.g. CSS, JS, images) from the 'public' directory and the uploaded images from the 'images/assets' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images/assets')));

// Set up a catch-all route that sends the index.html file for client-side routing
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'API', 'public', 'index.html'))
});

// Start the server on port 8000 and log a message to the console
app.listen(8000, ()=>{
    console.log('server running');
});
