import React, { useState } from "react";
import type { Rooms } from "../filterresults/FilterResults";
import { PiSortDescendingLight, PiSortAscendingLight } from "react-icons/pi";

import { Card, Rating, Button } from "@mui/material";
import type { FilterProps } from "../../pages/SearchResults";
function SearchResultsContainer({ data, handleData, results }: FilterProps) {
  const [sort, setSrot] = useState(false);
  const handleClick = () => {
    if (sort) handleData(data.sort((a, b) => a.roomPrice - b.roomPrice));
    else handleData(data.sort((a, b) => b.roomPrice - a.roomPrice));

    setSrot((s) => !s);
  };
  return (
    <section className="flex flex-col items-center justify-evenly mt-16">
      <div className="flex justify-between items-center w-full px-4 md:px-24">
        <h2 id="results" className="font-jakarta font-semibold text-2xl">
          Results:
        </h2>
        <button
          onClick={handleClick}
          className="text-ms font-semibold flex items-center gap-2 p-3 rounded-3xl bg-gray-100 hover:bg-gray-200"
        >
          Sort By Price
          {sort ? <PiSortDescendingLight /> : <PiSortAscendingLight />}
        </button>
      </div>
      <section
        aria-labelledby="results"
        className=" flex flex-col md:flex-row flex-wrap  justify-evenly gap-4 items-center mt-5"
      >
        {data.map((item: Rooms) => (
          <Card
            key={item.hotelId}
            sx={{
              maxWidth: 450,
              borderRadius: 4,
              padding: 2,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
            }}
            className="overflow-hidden"
          >
            <img
              src={item.roomPhotoUrl}
              alt="Hotel"
              className="rounded-3xl w-full h-60 object-cover"
            />

            <div className="px-2 py-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-2xl text-gray-800">
                  {`${item.cityName}, ${item.hotelName}`}{" "}
                </h3>

                <Rating
                  name="read-only"
                  value={item.starRating}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": { color: "#F4B000" },
                  }}
                />
              </div>

              <p className="text-gray-500 text-sm mt-1">Santorini, Greece</p>

              <p className="text-gray-600 text-sm mt-2">{item.roomType} </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-900 font-bold text-lg">
                  {`${item.roomPrice}`}{" "}
                  <span className="text-gray-500 font-normal text-sm">
                    /night
                  </span>
                </span>

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "9999px",
                    backgroundColor: "#57DEC7",
                    paddingX: 2.5,
                    "&:hover": {
                      backgroundColor: "#41ccb4",
                    },
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
}

export default SearchResultsContainer;
