"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import searchDark from "../../public/assets/searchD.svg";
import searchLight from "../../public/assets/searchL.svg";
import CountryCard from "./CountryCard";
import axios from "axios";

const SearchAndFilter = ({ theme, countries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let apiUrl;

        // If a continent is selected, fetch countries for that continent
        if (selectedContinent) {
          apiUrl = `https://restcountries.com/v3.1/region/${selectedContinent}`;
        } else {
          // If no continent is selected, fetch countries based on the search term
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

  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
  };

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
            className="placeholder:text-searchText dark:placeholder:text-backL dark:bg-backD md:text-sm text-xs font-normal"
            type="text"
            placeholder="Search for a country…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex rounded-md w-[200px] md:h-[56px] h-[48px] md:text-sm text-xs bg-transparent shadow-[0_2px_9px_0_rgba(0,0,0,0.05)] outline-none">
          <select
            className="w-full h-full px-6 appearance-none bg-backL dark:bg-backD te text-texts dark:text-backL rounded-md outline-none"
            value={selectedContinent}
            onChange={handleContinentChange}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      <CountryCard countries={searchResults} />
    </>
  );
};

export default SearchAndFilter;
