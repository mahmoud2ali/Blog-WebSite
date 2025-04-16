const express = require("express")
const  connectToDb = require("./config/connectDB")
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute")
const postRoute= require('./routes/postsRout');
const commentRoute = require("./routes/commentsRoute")
const categoriesRoute = require("./routes/categoriesRoute");
const serverless = require("serverless-http");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require('cors');

require("dotenv").config();

connectToDb();

const app = express();

app.use(express.json());

// Cors Policy
app.use(cors({
    origin: "*",
}));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/categories", categoriesRoute);

// Erorr Handler Middleware
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000;
// app.listen(PORT, ()=>{
//     console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// });

module.exports.handler = serverless(app);