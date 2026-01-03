import { connectDatabase } from "@/src/app/api/v1/db-config/dbconfig";
import Users from "@/src/app/api/v1/models/Users";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";

connectDatabase();

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { users_email } = reqBody;
    //Checks if a user with the provided email already exists.
    const user = await Users.findOne({ users_email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    } //check if password is correct

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await Users.updateOne(
      { users_email: users_email },
      {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
        },
      }
    ).exec();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Email successfully sent",
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
