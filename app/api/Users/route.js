import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    // Check if user exsits
    if (!userData?.email || !userData?.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check duplicate
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Email exists" }, { status: 409 });
    }
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    await User.create(userData);
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
