import { connectDatabase } from "@/src/app/api/v1/db-config/dbconfig";
import Users from "@/src/app/api/v1/models/Users";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDatabase();
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    // return NextResponse.json({ reqBody }, { status: 200 });
    const { users_first_name, users_last_name, users_email, users_password } =
      reqBody;
    //Checks if a user with the provided email already exists.
    const user = await Users.findOne({ users_email });
    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(users_password, salt);

    const newUser = new Users({
      users_first_name,
      users_last_name,
      users_email,
      users_password: hashedPassword,
    });

    // Saves the new user to the database.
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
