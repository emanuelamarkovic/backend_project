import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
} from "../controller/blogController.js";

const routerBlog = express.Router();

routerBlog.get("/", getAllBlogs);
routerBlog.post("/add", createBlog);
routerBlog.put("/update/:id", updateBlog);

export default routerBlog;
