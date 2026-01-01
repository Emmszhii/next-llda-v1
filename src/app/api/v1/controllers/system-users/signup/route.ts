import { connectDatabase } from "@/src/app/api/v1/db-config/dbconfig";
import SystemUsers from "@/src/app/api/v1/models/SystemUsers";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDatabase();
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    // return NextResponse.json({ reqBody }, { status: 200 });
    const {
      system_first_name,
      system_last_name,
      system_email,
      system_password,
    } = reqBody;
    //Checks if a user with the provided email already exists.
    const user = await SystemUsers.findOne({ system_email });
    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(system_password, salt);

    const newUser = new SystemUsers({
      system_first_name,
      system_last_name,
      system_email,
      system_password: hashedPassword,
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
