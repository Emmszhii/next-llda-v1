import { connectDatabase } from "@/src/app/api/v1/db-config/dbconfig";
import Users from "@/src/app/api/v1/models/Users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDatabase();
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    // return NextResponse.json({ reqBody }, { status: 200 });
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
      ...user,
    };

    // Create a token with expiration of 7 day
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
