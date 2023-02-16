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

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
        console.log("connected to Mongo")
    }
)

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'API', 'public', 'index.html'))
})

app.listen(8000, ()=>{
    console.log('server running ');
})