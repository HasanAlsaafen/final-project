import Navbar from "../components/navbar/Navbar";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import FilterResults from "../components/filterresults/FilterResults";
import type { Rooms } from "../components/filterresults/FilterResults";
import SearchResultsContainer from "../components/searchresultscontainer/SearchResultsContainer";
export interface FilterProps {
  data: Rooms[];
  results: Rooms[];
  handleData: React.Dispatch<React.SetStateAction<Rooms[]>>;
}
function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state as { results: Rooms[] };
  const [rooms, setRooms] = useState(results);

  const Header = (
    <header className="px-5 flex items-center gap-3">
      <IoIosArrowRoundBack
        className="text-gray-600 font-semibold text-4xl hover:scale-105 hover:bg-gray-200 rounded-4xl transition-all"
        onClick={() => navigate(-1)}
      />
      <p className="font-playfair text-2xl font-semibold">Search results</p>
    </header>
  );

  return (
    <section>
      <Navbar Header={Header} List={[]} />
      <section className="flex gap-5 flex-col md:flex-row items-start">
        <FilterResults data={rooms} handleData={setRooms} results={results} />
        <SearchResultsContainer
          data={rooms}
          handleData={setRooms}
          results={results}
        />
      </section>
    </section>
  );
}

export default SearchResults;
