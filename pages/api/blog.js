import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";
import BlogModel from "@/lib/models/BlogModel";
import connectDB from "@/lib/config/DB";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const blogs = await BlogModel.find({});
      return res.status(200).json({ blogs: blogs });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch blogs." });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return reject(err);
      }

      try {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!file || !file.filepath) {
          return res.status(400).json({ error: "No file uploaded." });
        }

        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "speakapp",
        });

        const blog = {
          title: fields.title[0],
          author: fields.author[0],
          category: fields.category[0],
          message: fields.message[0],
          image: result.secure_url,
        };

        const newPost = await BlogModel.create(blog);
        res.status(201).json({ message: "Blog Created", data: newPost });
        resolve();
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to create blog." });
        reject(error);
      }
    });
  });
}
