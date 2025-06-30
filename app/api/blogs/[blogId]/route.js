import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/lib/config/DB";
import BlogModel from "@/lib/models/BlogModel";
import sanitizeHtml from "sanitize-html";
import linkifyHtml from "linkify-html";

// 🧼 Clean + auto-link text
const sanitizeAndLinkify = (text) => {
  const sanitized = sanitizeHtml(text, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return linkifyHtml(sanitized, {
    defaultProtocol: "https",
    target: "_blank",
    rel: "noopener noreferrer",
  });
};

// 🔍 GET: Fetch a blog
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

// ✏️ PUT: Replace entire blog
export async function PUT(request, { params }) {
  const { blogId } = params;
  const body = await request.json();

  try {
    await connectDB();

    if (body.message) {
      body.message = sanitizeAndLinkify(body.message);
    }

    const updated = await BlogModel.findByIdAndUpdate(blogId, body, {
      new: true,
    });

    return NextResponse.json({ msg: "Blog updated", updated });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// ✂️ PATCH: Partially update blog
export async function PATCH(request, { params }) {
  const { blogId } = params;

  if (!blogId || !Types.ObjectId.isValid(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  const body = await request.json();

  try {
    await connectDB();

    if (body.message) {
      body.message = sanitizeAndLinkify(body.message);
    }

    const updated = await BlogModel.findByIdAndUpdate(blogId, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Blog patched", updated });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to patch blog" },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE: Remove blog
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
