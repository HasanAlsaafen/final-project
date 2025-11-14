import React, { useState, useEffect, useRef } from "react";
import { Slider, Rating, Checkbox, FormControlLabel } from "@mui/material";
import { useImmer } from "use-immer";
import type { FilterProps } from "../../pages/SearchResults";
interface Amenities {
  name: string;
  checked: boolean;
}

export interface Rooms {
  amenities: [{ description: string; id: number; name: string }];
  cityName: string;
  discount: number;
  hotelId: number;
  hotelName: string;
  latitude: number;
  longitude: number;
  roomPhotoUrl: string;
  roomPrice: number;
  roomType: string;
  starRating: number;
}

type SelectedRooms = {
  name: string;
  selection: boolean;
};

function FilterResults({ data, handleData, results }: FilterProps) {
  const [priceRange, setPriceRange] = useState<number[]>([50, 300]);
  const priceRef = useRef<number[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [amenities, setAmenities] = useImmer<Amenities[]>([]);
  const [selectedRooms, setSelecteRoom] = useImmer<SelectedRooms[]>([]);

  useEffect(() => {
    const types: string[] = [];
    const rooms: SelectedRooms[] = [];
    const amenitiesTemp: Amenities[] = [];
    const prices: number[] = [10000000000, 0];
    data.forEach((item: Rooms) => {
      if (!types.includes(item.roomType)) {
        types.push(item.roomType);
        rooms.push({ name: item.roomType, selection: false });
        if (item.roomPrice < prices[0]) prices[0] = item.roomPrice;
        if (item.roomPrice > prices[1]) prices[1] = item.roomPrice;
      }
      priceRef.current = prices;
      const amen = item.amenities;

      amen.forEach((a) => {
        if (!amenitiesTemp.find((item) => item.name === a.name)) {
          amenitiesTemp.push({ name: a.name, checked: false });
        }
      });
    });

    setSelecteRoom(rooms);
    setAmenities(amenitiesTemp);
  }, [data]);

  const marks = [
    { value: priceRef.current[0], label: `${priceRef.current[0]}$` },
    { value: priceRef.current[1], label: `${priceRef.current[1]}$` },
  ];

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) setPriceRange(newValue);
  };

  const handleAmenityToggle = (name: string) => {
    setAmenities((draft) => {
      const artwork = draft.find((a) => a.name === name);
      if (artwork) artwork.checked = !artwork.checked;
    });
  };

  const handleClear = () => {
    setPriceRange([50, 300]);
    setRating(0);
    setAmenities((draft) => {
      draft.forEach((a) => {
        a.checked = false;
      });
    });

    handleData(results);
  };
  const handleRoomChange = (name: string) => {
    setSelecteRoom((draft) => {
      const artwork = draft.find((a) => a.name === name);
      if (artwork) artwork.selection = !artwork.selection;
    });
  };
  const filterPrice = (dataToFilter: Rooms[]) => {
    return dataToFilter.filter((item) => {
      return item.roomPrice > priceRange[0] && item.roomPrice < priceRange[1];
    });
  };
  const filterRating = (dataToFilter: Rooms[]) => {
    return dataToFilter.filter((item) => item.starRating === rating);
  };
  const filterRooms = (dataToFilter: Rooms[], rooms: SelectedRooms[]) => {
    return dataToFilter.filter((item) => {
      return rooms.some((i1) => item.roomType === i1.name);
    });
  };
  const filterAmens = (dataToFilter: Rooms[], checkedAmen: Amenities[]) => {
    return dataToFilter.filter((item) => {
      return item.amenities.some((i1) =>
        checkedAmen.find((i2) => i2.name === i1.name)
      );
    });
  };

  const handleClick = () => {
    let filtered = [...results];

    const checkedAmens = amenities.filter((a) => a.checked);
    const rooms = selectedRooms.filter((r) => r.selection);

    if (rating) {
      filtered = filterRating(filtered);
    }

    if (checkedAmens.length > 0) {
      filtered = filterAmens(filtered, checkedAmens);
    }

    if (rooms.length > 0) {
      filtered = filterRooms(filtered, rooms);
    }

    handleData(filterPrice(filtered));
  };
  return (
    <section className="bg-white rounded-3xl min-w-80 shadow-xl flex flex-col max-w-sm p-6 m-5 font-poppins">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-2">Price Range</p>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={priceRef.current[0]}
          max={priceRef.current[1]}
          marks={marks}
          sx={{
            color: "#00D1C1",
            "& .MuiSlider-thumb": {
              border: "3px solid white",
            },
          }}
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-2">Star Rating</p>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={1}
          size="large"
          sx={{
            "& .MuiRating-iconFilled": { color: "#00D1C1" },
            "& .MuiRating-iconEmpty": { color: "#ddd" },
          }}
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-2">Room Type</p>
        <div className="flex gap-2 flex-wrap">
          {selectedRooms?.map((room: SelectedRooms) => (
            <button
              key={room.name}
              onClick={() => handleRoomChange(room.name)}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-all ${
                room.selection
                  ? "bg-teal-400 text-white border-teal-400"
                  : "border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-500"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 font-medium mb-1">Amenities</p>
        <div className="flex flex-col space-y-1">
          {amenities.map((a: Amenities) => (
            <FormControlLabel
              key={a.name}
              control={
                <Checkbox
                  checked={a.checked}
                  onChange={() => handleAmenityToggle(a.name)}
                  sx={{
                    color: "#00D1C1",
                    "&.Mui-checked": { color: "#00D1C1" },
                  }}
                />
              }
              label={<span className="text-gray-700">{a.name}</span>}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleClick}
        className="bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-full py-2 transition-colors mb-2"
      >
        Apply Filters
      </button>
      <button
        onClick={handleClear}
        className="text-gray-500 hover:text-teal-400 text-sm font-medium transition"
      >
        Clear All
      </button>
    </section>
  );
}

export default FilterResults;
