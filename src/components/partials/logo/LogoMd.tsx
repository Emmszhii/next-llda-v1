import LLDALogo from "../../rsvg/LLDALogo";

export default function LogoMd() {
  return (
    <>
      <div className="grid grid-cols-[80px_1fr] items-center gap-5 relative">
        <LLDALogo />
        <h1 className="font-bold text-base">
          <span>Laguna Lake Development Authority </span>
          {/* <span className="inline-block ml-1">(LLDA)</span> */}
        </h1>
      </div>
    </>
  );
}
