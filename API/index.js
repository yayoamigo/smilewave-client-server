const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require('path');
const multer = require("multer");
const fs = require('fs');

dotenv.config();


mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
        console.log("connected to Mongo")
    }
)

app.use(express.json());
app.use(morgan("common"));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "blob:"]
    }
  }
}));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/assets");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images/assets')));
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'API', 'public', 'index.html'))
})

app.listen(8000, ()=>{
    console.log('server running ');
})