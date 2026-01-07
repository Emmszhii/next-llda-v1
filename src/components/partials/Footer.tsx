import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="pt-10 pb-5">
        <div className="container">
          <div className="flex items-start flex-col text-center 2xl:text-left lg:flex-row lg:items-center lg:justify-between font-bold text-primary gap-4 text-[clamp(12px,3vw,14px)]">
            <span>
              Laguna Lake Development Authority © 2025 | Data Source: LLDA
              Monitoring Network
            </span>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://docs.google.com/document/d/1coZzcanH7zgXFucXf28Ykvypl4Msb2rfGSUbrR3nP3Y/edit?usp=sharing"
              className="hover:underline w-full lg:w-fit"
            >
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
