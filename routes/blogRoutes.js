import express from "express";
import { getAllBlogs, createBlog } from "../controller/blogController.js";

const routerBlog = express.Router();

routerBlog.get("/", getAllBlogs);
routerBlog.post("/add", createBlog);

export default routerBlog;
