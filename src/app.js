const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Middlewares
app.use(
	cors({
		origin: ["http://localhost:5173", "http://54.234.28.228"],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

//Routers
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
	.then(() => {
		console.log("MongoDB is Connected");
		app.listen(8080, () => {
			console.log("Hey i am Working on 8080");
		});
	})
	.catch((err) => {
		console.log("Database is not Connected", err);
	});
