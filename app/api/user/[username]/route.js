import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { username } = params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
