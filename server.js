import "./config.js";
import express from "express";
import connectMongoDB from "./db-connect.js";
import router from "./routes/userRoutes.js";
import routerBlog from "./routes/blogRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", router);
app.use("/api/blogs", routerBlog);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
