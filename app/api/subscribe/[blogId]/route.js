import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import UserModel from "@/lib/models/Email";

// DELETE /api/subscribe/:id
export async function DELETE(_, { params }) {
  const { blogId } = params;

  try {
    await connectDB();

    const deleted = await UserModel.findByIdAndDelete(blogId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subscriber deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
