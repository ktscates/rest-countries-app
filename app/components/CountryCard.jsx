"use client";
import React from "react";
import Image from "next/image";
import preview from "../../public/assets/preview.jpg";

const CountryCard = ({ countries }) => {
//   console.log("all in card", countries);

  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 flex flex-col gap-4 place-items-center md:ml-[45px] md:mr-[40px]">
      {sortedCountries.map((country, index) => (
        <div
          key={index}
          className="bg-backL dark:bg-backD w-[264px] h-[336px] md:mt-12 mt-8 text-backD dark:text-backLmd:mx-0 mx-auto rounded-md shadow-[0_0_7px_2px_rgba(0,0,0,0.03)]"
        >
          <div className="w-[264px] h-[160px]">
            <Image
              className=" rounded-t-md w-full h-full object-cover"
              src={country.flags.svg}
              alt="flag"
              width={264}
              height={160}
            />
          </div>

          <div className="mt-6 px-6">
            <h1 className="text-lg font-extrabold text-texts dark:text-backL">
              {country.name.common}
            </h1>
            <div className="mt-4 inline-flex flex-col gap-1 justify-items-center text-texts dark:text-backL text-sm font-semibold">
              <p>
                Population:{" "}
                <span className=" font-normal">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p>
                Region: <span className=" font-normal">{country.region}</span>
              </p>
              <p>
                Capital: <span className=" font-normal">{country.capital}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryCard;
