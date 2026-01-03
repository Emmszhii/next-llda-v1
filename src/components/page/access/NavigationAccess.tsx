"use client";
import {
  setIsAdd,
  setIsNavFullOpen,
  setIsSearch,
  setIsSettingsOpen,
} from "@/src/store/StoreAction";
import { useStore } from "@/src/store/StoreContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaCog } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { PiCaretDown } from "react-icons/pi";

export const getNavList = () => {
  const { store, dispatch } = useStore();

  const handleSettingsOpen = () => {
    dispatch(setIsSettingsOpen(!store.is_settings_open));
  };

  const onClickNav = () => {
    dispatch(setIsAdd(false));
    dispatch(setIsSearch(false));
  };

  let navList = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="size-4 text-white" />,
      menu: "dashboard",
      path: `/dashboard`,
      isOpenSubmenu: "",
      on_click: onClickNav,
      subList: [],
    },
    {
      label: "Water Quality",
      icon: <IoMdWater className="size-4 text-white" />,
      menu: "water-quality",
      path: `/water-quality`,
      isOpenSubmenu: "",
      on_click: onClickNav,
      subList: [],
    },
    {
      label: "Settings",
      icon: <FaCog className="size-4 text-white" />,
      menu: "settings",
      path: ``,
      isOpenSubmenu: store.is_settings_open,
      on_click: handleSettingsOpen,
      sub_name: "Settings",
      subList: [
        {
          name: "Users",
          path: `/settings/users`,
          submenu: "users",
        },
        {
          name: "Station",
          path: `/settings/station`,
          submenu: "station",
        },
        {
          name: "Quality Type",
          path: `/settings/quality-type`,
          submenu: "quality-type",
        },
        {
          name: "Quality Status",
          path: `/settings/quality-status`,
          submenu: "quality-status",
        },
      ],
    },
  ];

  return navList;
};

export const NavigationAccessFullWidth = ({ menu = "", submenu = null }) => {
  const { data: session, status } = useSession() as any;
  const { store, dispatch } = useStore();
  const isMobileOrTablet =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:426px)").matches;
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:1027px)").matches;
  const scrollRef = React.useRef<HTMLInputElement | null>(null);

  const handleShowNavigation = () => {
    dispatch(setIsSearch(false));
    if (isDesktop) {
      setTimeout(() => {
        dispatch(setIsNavFullOpen(!store.is_nav_full_open));
      }, 10);
    }
  };

  React.useEffect(() => {
    if (isMobileOrTablet === false && store.is_nav_full_open) {
      dispatch(setIsNavFullOpen(true));
    }
  }, [isMobileOrTablet === false && store.is_nav_full_open]);

  return (
    <>
      <div className="print:hidden">
        <nav
          className={`${
            store.is_nav_full_open ? "-translate-x-56" : "translate-x-0"
          } duration-200 ease-in fixed z-40 overflow-y-auto w-48 print:hidden py-3 uppercase  h-[calc(100dvh-68px)] scrollbar-thin bg-primary text-white`}
          ref={scrollRef}
        >
          <div className="text-sm text-dark flex flex-col justify-between h-full">
            <ul>
              {getNavList().map((item, key) => {
                return item.subList.length == 0 ? (
                  <li
                    key={key}
                    className={`${
                      menu === `${item.menu}` ? "bg-white" : "hover:bg-white/30"
                    } mb-2 pl-1`}
                    onClick={() => dispatch(setIsSearch(false))}
                  >
                    <Link
                      href={`${item.path}`}
                      className={
                        "w-full flex items-center px-2! py-1! justify-start tooltip-navigation"
                      }
                      onClick={handleShowNavigation}
                      data-tooltip={`${item.label}`}
                    >
                      <div className="flex items-center ">
                        <span className="mr-2">{item.icon}</span>
                        <span className="text-xs">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                ) : (
                  <React.Fragment key={key}>
                    <li
                      className={`${
                        menu === item.menu ? "bg-white" : "hover:bg-white/30"
                      } mb-2 cursor-pointer pl-1`}
                      onClick={item.on_click}
                    >
                      <div
                        className={
                          "w-full flex items-center justify-between px-2! py-1! tooltip-navigation "
                        }
                        data-tooltip="Payroll"
                      >
                        <span className="mr-2">{item.icon}</span>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs">{item.label}</span>
                          <PiCaretDown
                            className={`mr-2 ${
                              !item.isOpenSubmenu
                                ? "rotate-0 duration-200"
                                : "rotate-180 duration-200"
                            }`}
                          />
                        </div>
                      </div>
                    </li>
                    {item.isOpenSubmenu && (
                      <ul className="ml-9 mb-2 text-xs capitalize">
                        {item.subList.map((item, key) => {
                          return (
                            <li key={key}>
                              <Link
                                className={`${
                                  submenu === item.submenu
                                    ? "flex items-center justify-start border-white! "
                                    : "w-full flex items-center justify-start tooltip-navigation"
                                } py-0.5  w-full h-full px-1 my-0.5 mb-2 hover:border-white! duration-150 border-l-2! border-transparent rounded-r-md`}
                                href={`${item.path}`}
                                onClick={handleShowNavigation}
                              >
                                <span>{item.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </nav>
        <span
          className={`${
            store.is_nav_full_open ? "-translate-x-full" : ""
          } fixed z-30 w-screen h-screen bg-dark/50 ${
            isMobileOrTablet ? " " : "lg:hidden"
          }`}
          onClick={handleShowNavigation}
          onTouchMove={handleShowNavigation}
        ></span>
      </div>
    </>
  );
};

export const Navigations = ({ menu = "", submenu = null }) => {
  const { store, dispatch } = useStore();
  const navWrapperRef = React.useRef<HTMLInputElement | null>(null) as any;
  const hoverTimeout = React.useRef<HTMLInputElement | null>(null) as any;
  const [hoverText, setHoverText] = React.useState("");
  const [hoverPos, setHoverPos] = React.useState(0);
  const [showHover, setShowHover] = React.useState(false);
  const [hoverItem, setHoverItem] = React.useState(null as any);
  const [submenuMaxHeight, setSubmenuMaxHeight] = React.useState(300);

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoverItem(null);
    }, 200);
  };

  const handleMouseEnter = (e: any, item: any) => {
    clearTimeout(hoverTimeout.current);
    setHoverItem(item);
    setHoverText(` ${item.label}`);
    setShowHover(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navWrapperRef.current.getBoundingClientRect();

    const top = rect.top - navRect.top;
    const availableSpace = window.innerHeight - rect.top - 20; // subtract for margin

    setHoverPos(top);
    setSubmenuMaxHeight(availableSpace);
  };

  const handleHoverBoxEnter = () => {
    clearTimeout(hoverTimeout.current);
  };

  const handleHoverBoxLeave = () => {
    setHoverItem(null);
  };

  return (
    <>
      <div
        className={`${
          !store.is_nav_full_open ? "-translate-x-full" : "translate-x-0!"
        } navigation duration-200 ease-in w-fit `}
      >
        <div
          className={`${
            store.is_nav_full_open
              ? "h-[calc(100dvh-68px)]"
              : "h-[calc(100dvh-68px)]"
          } relative `}
        >
          <div
            ref={navWrapperRef}
            className="h-full bg-primary overflow-y-auto overflow-x-hidden scrollbar-thin pl-2 pr-2.5"
          >
            <nav className="flex flex-col mx-auto mt-1">
              {getNavList().map((item, index) => {
                const sharedClass = `relative group flex items-center justify-center w-5 h-7 mb-2 mx-auto text-dark ${
                  menu === item.menu
                    ? "bg-secondary "
                    : "hover:bg-secondary/30 hover:bg-secondary/80"
                }`;

                return item.path ? (
                  <Link
                    key={index}
                    href={`${item.path}`}
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleMouseEnter(e, item)}
                    className={sharedClass}
                  >
                    <span className="text-lg text-dark">{item.icon}</span>
                  </Link>
                ) : (
                  <div
                    key={index}
                    onMouseEnter={(e) => handleMouseEnter(e, item)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleMouseEnter(e, item)}
                    className={sharedClass}
                  >
                    <span className="text-lg text-dark">{item.icon}</span>
                  </div>
                );
              })}
            </nav>
          </div>
          {hoverItem && !hoverItem?.subList?.length && (
            <div
              className={`absolute left-14 transition-all duration-300 my-0.5 whitespace-nowrap bg-secondary text-dark text-xs px-2 py-1 rounded shadow-md z-50 ${
                showHover
                  ? "group-hover:opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ top: hoverPos }}
            >
              {hoverText}
            </div>
          )}

          {/* Submenu */}
          {hoverItem && hoverItem?.subList?.length > 0 && (
            <div
              className={`absolute left-14 z-40 transition-all duration-500 ${
                showHover
                  ? "group-hover:opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ top: hoverPos }}
              onMouseEnter={handleHoverBoxEnter}
              onMouseLeave={handleHoverBoxLeave}
            >
              <div className="absolute left-3.75 top-2 w-0 h-0 border-8 border-transparent border-r-secondary"></div>
              <ul
                className="bg-secondary rounded shadow-lg w-44 py-3 text-xs overflow-y-auto  scrollbar-thin"
                style={{ maxHeight: `${submenuMaxHeight}px` }}
              >
                <li className="px-4 pb-2 text-[11px] text-dark font-bold tracking-wider uppercase">
                  {hoverItem.sub_name}
                </li>
                {hoverItem.subList.map((subItem: any, subIndex: any) => (
                  <li key={subIndex}>
                    <Link
                      className={`block px-4 hover:bg-primary/30 ${
                        submenu === subItem.submenu
                          ? " text-primary"
                          : " text-dark"
                      }  `}
                      href={`${subItem.path}`}
                    >
                      <p className="border-l-2 border-transparent py-1">
                        {subItem.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
