import React from "react";
import Link from "next/link";
import Image from "next/image";
import light from "../../public/assets/light.svg";
import dark from "../../public/assets/dark.svg";

const Navbar = ({ theme, changeTheme }) => {
  return (
    <nav className="bg-backL dark:bg-backD w-full h-[80px] flex justify-between items-center md:px-[80px] px-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]">
      <h1 className="md:text-2xl text-sm font-extrabold text-texts dark:text-backL">
        Where in the world?
      </h1>
      <h1
        className="flex items-center gap-2 md:text-base text-xs font-semibold cursor-pointer dark:text-backL"
        onClick={changeTheme}
      >
        <Image src={theme === "dark" ? dark : light} alt="mode" />
        <span>Dark Mode</span>
      </h1>
    </nav>
  );
};

export default Navbar;
