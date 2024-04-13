import "./config.js";
import express from "express";
import connectMongoDB from "./db-connect.js";
import router from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
