import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

// Middlewre setting up
// all the routes settled in ( postRoutes =  posts.js ) will start with  localhost:5000/posts/<route>

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

// This is somethign that look when you open api
app.get("/posts/belong/luist", (req, res) => {
  res.send("API belong to Luis Torres");
});

//  Serve static files
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.sendFile("build", "index.html");
});

// const CONNECTION_URL =
//   "mongodb+srv://letorres:letorres@cluster0.4hem8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
