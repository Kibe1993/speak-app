import { NextResponse } from "next/server";
import CommentModel from "@/lib/models/comments";
import connectDB from "@/lib/config/DB";

export async function GET(_, { params }) {
  const { blogId } = params;

  try {
    await connectDB();

    const comments = await CommentModel.find({ blogId }).sort({ date: -1 });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
export async function DELETE(_, { params }) {
  const { blogId } = params;

  try {
    await connectDB();

    const deletedComment = await CommentModel.findByIdAndDelete(blogId);

    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
