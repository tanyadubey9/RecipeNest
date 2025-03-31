import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export async function PUT(req, { params }) {
  await connectDB();
  
  try {
    const { username } = params;
    const { profilepic, coverpic } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { profilepic, coverpic },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}
