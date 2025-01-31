const express = require("express")
const  connectToDb = require("./config/connectDB")
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute")
const postRoute= require('./routes/postsRout');
require("dotenv").config();

connectToDb();

const app = express();

app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use("/api/posts", postRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});