import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.NODE_PORT || 7000;
const URL = process.env.NODE_MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", router);
