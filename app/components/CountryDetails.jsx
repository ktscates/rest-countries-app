"use client";
import React from "react";
import Image from "next/image";
import preview from "../../public/assets/preview.jpg";
import backL from "../../public/assets/backL.svg";
import backD from "../../public/assets/backD.svg";

const CountryDetails = ({ theme }) => {
  return (
    <div className="mt-20 md:mx-20">
      <div>
        <button className="flex justify-between items-center py-[10px] px-8 rounded-md shadow-[0_0_7px_0_rgba(0,0,0,0.29)] text-texts dark:text-backL bg-backL dark:bg-backD gap-[10px]">
          <Image src={theme === "dark" ? backL : backD} alt="back" />
          Back
        </button>
      </div>
      <div className="grid grid-cols-2 mt-[90px] gap-[144px]">
        <div className="">
          <Image
            className=" rounded-t-md w-full h-full object-cover"
            src={preview}
            alt="flag"
            width={264}
            height={160}
          />
        </div>

        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-[32px] font-extrabold text-texts dark:text-backL">
            country name
          </h1>
          <div className="flex justify-between items-center">
            <div className="inline-flex flex-col gap-1 justify-items-center text-texts dark:text-backL text-basefont-semibold">
              <p>
                Native Name <span className=" font-light text-sm">name</span>
              </p>
              <p>
                Population: <span className=" font-light text-sm">pop</span>
              </p>
              <p>
                Region: <span className=" font-light text-sm">reg</span>
              </p>
              <p>
                Sub Region: <span className=" font-light text-sm">sub</span>
              </p>
              <p>
                Capital: <span className=" font-light text-sm">capital</span>
              </p>
            </div>
            <div className="inline-flex flex-col gap-1 justify-items-center text-texts dark:text-backL text-base font-semibold">
              <p>
                Top Level Domain <span className=" font-light text-sm">domain</span>
              </p>
              <p>
                Currencies: <span className=" font-light text-sm">pop</span>
              </p>
              <p>
                Languages: <span className=" font-light text-sm">reg</span>
              </p>
            </div>
          </div>
          <div className="mt-[46px] text-base text-texts dark:text-backL font-semibold">
            <p>
              Border Countries: <span className=" font-light text-sm">reg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
