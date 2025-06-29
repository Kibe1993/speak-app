import BlogModel from "@/lib/models/BlogModel";
import connectDB from "@/lib/config/DB";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ blogs });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch blogs." });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, author, category, message, image } = req.body;

      if (!title || !author || !category || !message || !image) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const newBlog = await BlogModel.create({
        title,
        author,
        category,
        message,
        image,
      });

      return res.status(201).json({ message: "Blog Created", data: newBlog });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to create blog." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
