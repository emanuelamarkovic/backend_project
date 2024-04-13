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
    const { id } = req.params; // Zugriff auf die ID aus den Routenparametern
    const newBlogData = req.body; // Neue Blog-Daten aus dem Request Body

    // Hier können Sie die ID verwenden, um den entsprechenden Blog zu finden und zu aktualisieren
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    // Erfolgreiche Antwort mit dem aktualisierten Blog
    res.json({ message: "Blog updated", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllBlogs, createBlog, updateBlog };
