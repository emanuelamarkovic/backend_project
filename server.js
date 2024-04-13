import "./config.js";
import express from "express";
import connectMongoDB from "./db-connect.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
