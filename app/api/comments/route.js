// app/api/comments/route.js
import { NextResponse } from "next/server";

import CommentModel from "@/lib/models/comments";
import connectDB from "@/lib/config/DB";

export async function POST(request) {
  const { name, email, message, blogId } = await request.json();

  if (!name || !message || !blogId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const newComment = await CommentModel.create({
      name,
      email,
      message,
      blogId,
    });

    return NextResponse.json(
      { message: "Comment posted successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
