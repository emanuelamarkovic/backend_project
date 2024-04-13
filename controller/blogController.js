import Blog from "../models/blog.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const newBlog = { title, description, user };
    await Blog.create(newBlog);
    res.json({ message: "New blog added", newBlog });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export { getAllBlogs, createBlog };
