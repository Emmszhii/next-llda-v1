"use client";
import HeaderAccess from "@/src/app/components/HeaderAccess";
import React from "react";
import FooterAccess from "./FooterAccess";
import { NavigationAccessFullWidth, Navigations } from "./NavigationAccess";
import { useStore } from "@/src/store/StoreContext";

export default function Layout({
  children,
  menu = "",
  submenu = "",
}: Readonly<{
  children: React.ReactNode;
  menu: string;
  submenu: string;
}>) {
  const { store, dispatch } = useStore();

  return (
    <>
      <HeaderAccess />
      <NavigationAccessFullWidth menu={menu} submenu={submenu} />
      <Navigations menu={menu} submenu={submenu} />
      <div className={`wrapper ${!store.is_nav_full_open && "ml-48"}`}>
        <h2 className="capitalize font-bold">
          {submenu == ""
            ? menu?.replaceAll("-", " ")
            : submenu?.replaceAll("-", " ")}
        </h2>
      </div>
      {children}
      <FooterAccess />
    </>
  );
}
