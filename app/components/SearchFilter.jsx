"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import searchDark from "../../public/assets/searchD.svg";
import searchLight from "../../public/assets/searchL.svg";
import arrowL from "../../public/assets/arrowL.svg";
import arrowD from "../../public/assets/arrowD.svg";
import CountryCard from "./CountryCard";
import axios from "axios";

const SearchAndFilter = ({ theme, countries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let apiUrl;

        if (selectedContinent) {
          // Use 'subregion' instead of 'region' for continents
          apiUrl = `https://restcountries.com/v3.1/subregion/${selectedContinent}`;
        } else {
          apiUrl = `https://restcountries.com/v3.1/name/${searchTerm}`;
        }

        const response = await axios.get(apiUrl);
        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Only make the API call if the search term or selected continent is not empty
    if (searchTerm.trim() !== "" || selectedContinent !== "") {
      fetchSearchResults();
    } else {
      // If both search term and selected continent are empty, clear the search results
      setSearchResults(countries);
    }
  }, [searchTerm, selectedContinent, countries]);

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setSearchTerm(""); // Clear the search term when a continent is selected
    setShowOptions(false); // Hide the options after selecting a continent
  };

  const continents = [
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  return (
    <>
      <div className="flex md:flex-row flex-col md:gap-0 gap-10 md:justify-between md:px-[80px] px-4 md:mt-12 mt-6">
        <div className="flex justify-start items-center gap-6 rounded-md bg-backL dark:bg-backD md:w-[380px] md:h-[56px] w-full h-[48px] shadow-[0_2px_9px_0_rgba(0,0,0,0.05)]">
          <div className="pl-8">
            <Image
              src={theme === "dark" ? searchDark : searchLight}
              alt="search icon"
              width={20}
              height={20}
            />
          </div>
          <input
            className="placeholder:text-searchText dark:placeholder:text-backL dark:bg-backD md:text-sm text-xs font-normal text-searchText dark:text-blackL border-none focus:border-none focus:outline-none"
            type="text"
            placeholder="Search for a country…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-between rounded-md w-[200px] md:h-[56px] h-[48px] md:text-sm text-xs bg-backL text-texts dark:text-backL dark:bg-backD shadow-[0_2px_9px_0_rgba(0,0,0,0.05)] outline-none"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span className="px-6">
              {selectedContinent ? selectedContinent : "Filter by Region"}
            </span>
            <Image
              className="fill-current mr-6"
              src={theme === "dark" ? arrowL : arrowD}
              alt="expand"
              width={10}
              height={10}
            />
          </button>
          {showOptions && (
            <div className="absolute w-full top-full mt-1 bg-backL dark:bg-backD text-texts dark:text-backL border rounded-md shadow-lg border-none focus:border-none focus:outline-none">
              {continents.map((continent) => (
                <button
                  key={continent.value}
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  onClick={() => handleContinentChange(continent.value)}
                >
                  {continent.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <CountryCard countries={searchResults} />
    </>
  );
};

export default SearchAndFilter;
