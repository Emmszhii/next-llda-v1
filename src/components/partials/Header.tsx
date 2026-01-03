"use client";
import { setIsShow } from "@/src/store/StoreAction";
import { useStore } from "@/src/store/StoreContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LLDALogo from "../rsvg/LLDALogo";
import LoadingBar from "./loading/LoadingBar";

const Header = () => {
  const { data: session, status } = useSession() as any;
  const { store, dispatch } = useStore();

  const handleShowNavigation = () => {
    dispatch(setIsShow(!store.is_show));
  };

  // can be use for disabling scroll when modal is shown
  React.useEffect(() => {
    document.body.style.overflow = store.is_show ? "hidden" : "unset";
  }, [store.is_show]);

  const handleClick = () => {
    dispatch(setIsShow(!store.is_show));
  };

  const handleLogout = async () => {
    handleShowNavigation();
    signOut();
  };

  return (
    <header className="sticky top-0 py-2 w-full z-30 bg-white overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 relative z-31">
            <LLDALogo />
            <h1 className="font-bold hidden lg:block">
              <span className="inline-block">
                Laguna Lake Development Authority{" "}
              </span>
              {/* <span className="inline-block ml-1">(LLDA)</span> */}
            </h1>
            <h1 className="font-bold lg:hidden">LLDA</h1>
          </div>
          <div
            className={`burger_button ${store.is_show ? "active" : ""}`}
            onClick={handleShowNavigation}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={`fixed w-full h-dvh left-full z-30 top-0 transition-all lg:static lg:w-fit lg:h-fit lg:transition-none ${
              store.is_show ? "left-0!" : ""
            }`}
          >
            <ul className="flex flex-col pt-20 lg:pt-0 lg:flex-row items-center gap-y-5 gap-x-10 cursor-pointer font-semibold h-dvh bg-white lg:bg-transparent lg:h-fit">
              <li className="hover:underline px-2 py-2">
                <a onClick={handleClick} href="#about">
                  About
                </a>
              </li>
              <li className="hover:underline px-6 py-2 bg-primary text-white rounded-sm">
                <a onClick={handleClick} href="#">
                  Explore the lake
                </a>
              </li>
              {status == "loading" ? (
                <li>
                  <div className="w-20 h-6">
                    <LoadingBar />
                  </div>
                </li>
              ) : session?.data._id ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="cursor-pointer hover:underline"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="cursor-pointer hover:underline"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
