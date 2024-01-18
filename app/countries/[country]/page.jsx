"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import backL from "../../../public/assets/backL.svg";
import backD from "../../../public/assets/backD.svg";
import axios from "axios";
import Navbar from "@/app/components/Navbar";

const CountryDetails = () => {
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState("light");
  const params = useParams();

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

  const allCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => allCountries(), []);

  // Find the country based on the condition
  const country = countries.find((country) => country.cca3 === params.country);
  console.log("country", country);

  const renderLanguages = () => {
    if (country && country.languages) {
      return (
        <p>
          Languages:{" "}
          <span className="font-light text-sm">
            {Object.values(country.languages).join(", ")}
          </span>
        </p>
      );
    }
    return null;
  };

  const renderBorders = () => {
    if (country && country.borders) {
      return (
        <div className="mt-[46px] text-base text-texts dark:text-backL font-semibold">
          <p>
            Border Countries:{" "}
            {country.borders.map((borderCode) => {
              const borderCountry = countries.find(
                (c) => c.cca3 === borderCode
              );

              if (borderCountry) {
                return (
                  <span key={borderCode}>
                    <Link href={`/countries/${borderCode}`} legacyBehavior>
                      <a className="font-light text-sm mx-2 px-2 py-2  rounded-md shadow-[0_0_7px_2px_rgba(0,0,0,0.10)] dark:bg-backD">
                        {borderCountry.name.common}
                      </a>
                    </Link>
                  </span>
                );
              }
              return null;
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-backL dark:bg-backgroundD min-h-screen">
      <Navbar theme={theme} changeTheme={changeTheme} />
      <div className="mt-20 md:mx-20">
        <div>
          <Link href="/" passHref legacyBehavior>
            <button className="flex items-center py-[10px] px-8 rounded-md shadow-[0_0_7px_0_rgba(0,0,0,0.29)] text-texts dark:text-backL bg-backL dark:bg-backD gap-[10px]">
              <Image src={theme === "dark" ? backL : backD} alt="back" />
              Back
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 mt-[90px] gap-[144px] bg-backL dark:bg-backgroundD">
          <div className="">
            <Image
              className=" rounded-t-md w-full h-full object-center"
              src={country && country.flags && country.flags.svg}
              alt="flag"
              width={200}
              height={150}
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-[32px] font-extrabold text-texts dark:text-backL">
              {country && country.name.common}
            </h1>
            <div className="flex justify-between">
              <div className="inline-flex flex-col gap-1 justify-items-center text-texts dark:text-backL text-basefont-semibold">
                <p>
                  Native Name:{" "}
                  <span className=" font-light text-sm">
                    {country && country.name.official}
                  </span>
                </p>
                <p>
                  Population:{" "}
                  <span className=" font-light text-sm">
                    {country && country.population.toLocaleString()}
                  </span>
                </p>
                <p>
                  Region:{" "}
                  <span className=" font-light text-sm">
                    {country && country.region}
                  </span>
                </p>
                <p>
                  Sub Region:{" "}
                  <span className=" font-light text-sm">
                    {country && country.subregion}
                  </span>
                </p>
                <p>
                  Capital:{" "}
                  <span className=" font-light text-sm">
                    {country && country.capital}
                  </span>
                </p>
              </div>
              <div className="inline-flex flex-col gap-1 justify-items-center text-texts dark:text-backL text-base font-semibold">
                <p>
                  Top Level Domain:{" "}
                  <span className=" font-light text-sm">
                    {country && country.tld[0]}
                  </span>
                </p>
                <p>
                  Currencies:{" "}
                  <span className=" font-light text-sm">
                    {country &&
                      Object.values(country.currencies)
                        .map((currency) => currency.name)
                        .join(", ")}
                  </span>
                </p>
                <div>{renderLanguages()}</div>
              </div>
            </div>
            <div>{renderBorders()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
