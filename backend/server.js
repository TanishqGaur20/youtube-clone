import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { videoRoutes } from "./routes/videoRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { channelRoutes } from "./routes/channelRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";
import cors from "cors";
mongoose.connect(process.env.MONGO_URL); //connect to mongodb atlas database
//all the code below is just to see if the connection is working or not
const db = mongoose.connection;
db.on("open", () => {
  console.log("connection successful");
});
db.on("error", () => {
  console.log("connection unsucessfull");
});

const app = new express(); // initialize the Express app
//make a server
app.listen(process.env.PORT, () => {
  console.log("server is running on port ", process.env.PORT);
});
app.use(cors());
app.use(express.json()); //to parse the incoming json

videoRoutes(app);
userRoutes(app);
channelRoutes(app);
commentRoutes(app);
