"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { isUrlPublic } from "../helper/public-url";

export default function UseCheckSessionLogout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession() as any;

  console.log(status);
  React.useEffect(() => {
    if (status != "loading" && session?.count == 0) {
      const isPublicUrl = isUrlPublic(window.location.pathname);
      if (isPublicUrl == false) {
        signOut();
        window.location.href = "/";
      }
    }
  }, [status != "loading"]);

  return <>{children}</>;
}
