import mongoose from "mongoose";
import UserModel from "@/lib/models/Email";
import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";

export async function GET() {
  try {
    await connectDB();
    const emails = await UserModel.find({});
    return NextResponse.json({ msg: "Emails retrieved", emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to retrieve emails" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await connectDB();

    const newUser = await UserModel.create({ email });

    return NextResponse.json(
      { message: "Email saved successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
