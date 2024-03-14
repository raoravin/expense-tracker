
const express = require("express");
const cors = require("cors");
const app = express()
require("dotenv").config();
const {db }= require("./config/db")
const {readdirSync} = require("fs");
const transction = require("./routes/transaction")


const port = process.env.PORT


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // Replace with your frontend's origin
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/v1",transction)



const server = () => {
    db()
    app.listen(port, () => {
        console.log("You are listening to port:",port);
    })
}

server();