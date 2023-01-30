const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");


const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5500;

const TodoItemRoute = require("./routes/todoitems")

app.use(cors());

mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database Connected"))
.catch(err => console.log(err));

app.use("/", TodoItemRoute);

app.listen(PORT, () => console.log("Server Connected"));