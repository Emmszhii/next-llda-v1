"use client";
import {
  setIsHeaderShow,
  setIsNavFullOpen,
  setIsShow,
} from "@/src/store/StoreAction";
import { useStore } from "@/src/store/StoreContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaIndent } from "react-icons/fa";
import {
  MdOutlineAccountCircle,
  MdOutlineLogout,
  MdOutlineMailOutline,
} from "react-icons/md";
import LoadingBar from "../../partials/loading/LoadingBar";
import ScreenSpinner from "../../partials/loading/ScreenSpinner";
import LLDALogoSm from "../../rsvg/LLDALogoSm";

const HeaderAccess = () => {
  const { data: session, status } = useSession() as any;
  const { store, dispatch } = useStore();
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef<HTMLInputElement | null>(null);

  const isDeveloper = session?.data.system_first_name;
  const email = isDeveloper
    ? session?.data.system_email
    : session?.data.users_email;
  const name = isDeveloper
    ? `${session?.data.system_last_name}, ${session?.data.system_first_name}`
    : `${session?.data.users_last_name}, ${session?.data.users_first_name}`;
  const lastName = isDeveloper
    ? session?.data.system_last_name
    : session?.data.users_email;
  const firstName = isDeveloper
    ? session?.data.system_first_name
    : session?.data.users_email;

  const handleShowNavigation = () => {
    dispatch(setIsNavFullOpen(!store.is_nav_full_open));
  };
  const handleShowHeader = () => {
    dispatch(setIsHeaderShow(!store.is_header_show));
  };

  // can be use for disabling scroll when modal is shown
  React.useEffect(() => {
    document.body.style.overflow =
      store.is_show || store.is_add ? "hidden" : "unset";
  }, [store.is_show || store.is_add]);

  const handleClick = () => {
    dispatch(setIsShow(!store.is_show));
  };

  const handleLogout = async () => {
    setLoading(true);
    setTimeout(() => {
      handleShowNavigation();
      signOut({ callbackUrl: "/" });
      setLoading(false);
    }, 2000);
  };

  const handleClickOutside = (e: any) => {
    if (!ref.current?.contains(e.target)) {
      setTimeout(() => {
        dispatch(setIsHeaderShow(false));
      }, 100);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {loading && <ScreenSpinner />}
      <header className="sticky top-0 px-2 py-2 w-full z-30 overflow-hidden border-b-2 border-primary">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 relative z-31">
            <button
              onClick={handleShowNavigation}
              className={`py-4 pl-1 pr-0 text-gray-600 bg-white z-50 flex items-center rounded-br-sm focus:outline-0 cursor-pointer duration-200 ease-in`}
              title={store.is_settings_open ? "Expand" : "Collapse"}
            >
              <FaIndent
                className={`text-sm hover:text-secondary ${
                  !store.is_settings_open && "rotate-180"
                }`}
              />
            </button>
            <LLDALogoSm />
            <h1 className="font-bold hidden lg:block">
              <span className="inline-block">
                Laguna Lake Development Authority{" "}
              </span>
            </h1>
            <h1 className="font-bold lg:hidden">LLDA</h1>
          </div>
          <div>
            <div className="block relative" ref={ref}>
              {status == "loading" ? (
                <div className="block size-8 mr-2 rounded-full overflow-hidden">
                  <LoadingBar />
                </div>
              ) : session?.count == 0 ? null : (
                <>
                  <div
                    className="flex items-center px-1 gap-2 group cursor-pointer"
                    onClick={handleShowHeader}
                  >
                    <div
                      className={`p-px duration-50 ease-out border-2 border-transparent hover:border-2 hover:border-primary hover:border-opacity-50 rounded-full ${
                        store.is_header_show
                          ? "border-primary!"
                          : "border-opacity-50!"
                      }`}
                    >
                      <div className="flex bg-primary rounded-full justify-center items-center min-w-8 min-h-8 max-w-8 max-h-8 text-white pt-0.5 uppercase">
                        {lastName[0]}
                        {firstName[0]}
                      </div>
                    </div>
                  </div>
                  {store.is_header_show && (
                    <div className="text-xs p-1 fixed top-15 right-7 bg-white rounded-md border border-primary">
                      <ul className="p-2">
                        <li className="mb-0 font-bold  capitalize text-sm">
                          {name}
                        </li>
                        <li className="mb-0 pb-2 capitalize text-xs">
                          {isDeveloper ? "Developer" : "Admin"}
                        </li>
                        <li className="pb-2 flex items-center gap-2 text-xs">
                          <MdOutlineMailOutline />
                          {email}
                        </li>
                        <li className="flex items-center gap-2 hover:text-secondary">
                          <MdOutlineAccountCircle />
                          <Link href={`/account`} className="w-full">
                            Account
                          </Link>
                        </li>

                        <button
                          onClick={() => handleLogout()}
                          className="hover:text-secondary flex items-center gap-2 pt-2 w-full"
                        >
                          <MdOutlineLogout />
                          Logout
                        </button>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAccess;
