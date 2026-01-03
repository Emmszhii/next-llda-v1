import { connectDatabase } from "@/src/app/api/v1/db-config/dbconfig";
import Users from "@/src/app/api/v1/models/Users";
import { encrypt } from "@/src/app/lib/lib";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";

connectDatabase();
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { users_email, users_password } = reqBody;
    //Checks if a user with the provided email already exists.
    const user = await Users.findOne({ users_email });
    //If no, returns a 400 response.
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    } //check if password is correct
    const validPassword = await bcryptjs.compare(
      users_password,
      user.users_password
    );
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      is_developer: false,
      ...user,
    };

    // Create a token with expiration of 7 day
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    const session = await encrypt(tokenData);
    // await signIn("credentials", {
    //   session,
    //   redirect: false,
    // });

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    response.cookies.set("session", session, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract user ID from the authentication token
    const userId = await getDataFromToken(request);

    // Find the user in the database based on the user ID
    const user = await Users.findOne({ _id: userId }).select("-users_password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
