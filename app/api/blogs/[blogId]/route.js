import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/lib/config/DB";
import BlogModel from "@/lib/models/BlogModel";

export async function GET(request, { params }) {
  const { blogId } = params;

  if (!blogId || !Types.ObjectId.isValid(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ updated: blog });
  } catch (error) {
    console.error("GET /api/blogs/[blogId] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
// PUT: Update blog
export async function PUT(request, { params }) {
  const blogId = params.blogId;
  const body = await request.json();

  try {
    const updated = await BlogModel.findByIdAndUpdate(blogId, body, {
      new: true,
    });
    return NextResponse.json({ msg: "Blog update", updated: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { blogId } = params;
  if (!blogId || !Types.ObjectId.isValid(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  try {
    await connectDB();
    await BlogModel.findByIdAndDelete(blogId);
    return NextResponse.json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
