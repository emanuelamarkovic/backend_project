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

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const newBlogData = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogData, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.json({ message: "Blog updated", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getById = async (req, res) => {
  console.log("req.params", req.params);
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error getting blog by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }
    res.json({ message: "Blog deleted", deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllBlogs, createBlog, updateBlog, getById, deleteBlog };
