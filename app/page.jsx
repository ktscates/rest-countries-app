"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import light from "../public/assets/light.svg";
import dark from "../public/assets/dark.svg";
import Navbar from "./components/Navbar";
import SearchFilter from "./components/SearchFilter";
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

  useEffect(() => allCountries(), []);

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
      <Navbar theme={theme} changeTheme={changeTheme} />
      <SearchFilter theme={theme} countries={countries} />
    </main>
  );
}
