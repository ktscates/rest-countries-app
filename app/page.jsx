"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import lightMode from "../public/assets/light.svg";
import darkMode from "../public/assets/dark.svg";
import SearchFilter from "./components/SearchFilter";
import CountryCard from "./components/CountryCard";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [countries, setCountries] = useState([]);

  const allCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => allCountries())
  

  const changeTheme = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <main className="bg-backgroundL min-h-screen dark:bg-backgroundD max-w-[1440px] mx-auto">
      <nav className=" bg-backL dark:bg-backD w-full h-[80px] flex justify-between items-center md:px-[80px] px-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]">
        <h1 className=" md:text-2xl text-sm font-extrabold text-texts dark:text-backL">
          Where in the world?
        </h1>
        <h1
          className="flex items-center  gap-2 md:text-base text-xs font-semibold cursor-pointer dark:text-backL"
          onClick={changeTheme}
        >
          <Image src={theme === "dark" ? darkMode : lightMode} alt="mode" />
          <span>Dark Mode</span>
        </h1>
      </nav>

      <SearchFilter theme={theme} countries={countries} />

      {/* <CountryDetails theme={theme} /> */}
    </main>
  );
}
