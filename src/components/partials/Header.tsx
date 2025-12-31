import React from "react";
import LLDALogo from "../rsvg/LLDALogo";

const Header = () => {
  return (
    <header className="sticky top-0 py-2 w-full z-30 bg-white">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <LLDALogo />
            <h1 className="font-bold">
              Laguna Lake Development Authority <span>(LLDA)</span>
            </h1>
          </div>
          <div>
            <ul className="flex items-center gap-x-10 cursor-pointer font-semibold">
              <li className="hover:underline px-2 py-2">About</li>
              <li className="hover:underline px-6 py-2 bg-primary text-white rounded-sm">
                Explore the lake
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
