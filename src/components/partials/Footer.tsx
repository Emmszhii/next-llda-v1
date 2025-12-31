import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="pt-10 pb-5">
        <div className="container">
          <div className="flex items-start flex-col lg:flex-row lg:items-center lg:justify-between font-bold text-primary">
            <span>
              Laguna Lake Development Authority © 2025 | Data Source: LLDA
              Monitoring Network
            </span>
            <a href="#" className="hover:underline">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
