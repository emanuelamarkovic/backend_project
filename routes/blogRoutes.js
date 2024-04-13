import express from "express";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  getById,
  deleteBlog,
} from "../controller/blogController.js";

const routerBlog = express.Router();

routerBlog.get("/", getAllBlogs);
routerBlog.post("/add", createBlog);
routerBlog.put("/update/:id", updateBlog);
routerBlog.get("/:id", getById);
routerBlog.delete("/delete/:id", deleteBlog);

export default routerBlog;
