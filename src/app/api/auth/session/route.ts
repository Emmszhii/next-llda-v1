import { decrypt } from "@/src/app/lib/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// This function handles HTTP GET requests to the API route.
export async function GET(request: NextRequest) {
  const cookie = await cookies();
  const tokenCookie = cookie.get("token")?.value || "";
  const sessionCookie = cookie.get("session")?.value || "";
  let userData: object = {},
    count: number = 0;
  if (tokenCookie && sessionCookie != "") {
    const decryptSession = await decrypt(sessionCookie);
    const data = decryptSession._doc as any;
    delete data.users_password;
    delete data.__v;
    delete data.forgotPasswordToken;
    delete data.forgotPasswordTokenExpiry;

    // if (decryptSession?.user_email) {
    //   const user = await Users.findOne({
    //     user_email: decryptSession.user_email,
    //   });
    //   console.log(user);
    // }
    count = 1;
    userData = data as object;
  }

  const response = NextResponse.json({
    message: "Session success.",
    data: userData,
    count: count,
    success: true,
  });

  if (!sessionCookie || !tokenCookie) {
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    response.cookies.set("session", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  }

  return response;
}
