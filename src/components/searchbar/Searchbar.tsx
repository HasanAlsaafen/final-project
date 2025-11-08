import React from "react";
import "../../app.css";
import { useFormik } from "formik";
const token = localStorage.getItem("token") || "";

export default function Searchbar() {
  const Today = new Date();
  const Tomorrow = new Date();
  Tomorrow.setDate(Today.getDate() + 1);

  const API = "https://hotel.foothilltech.net/api/home/search";

  interface SearchParams {
    checkInDate: string;
    checkOutDate: string;
    city: string;
    token: string;
    numberOfRooms?: number;
    adults?: number;
    children?: number;
  }

  async function searchHotels({
    checkInDate,
    checkOutDate,
    city,
    numberOfRooms = 1,
    adults = 2,
    children = 0,
    token,
  }: SearchParams) {
    const query = new URLSearchParams({
      checkInDate,
      checkOutDate,
      city,
      numberOfRooms: numberOfRooms.toString(),
      adults: adults.toString(),
      children: children.toString(),
    });

    const response = await fetch(`${API}?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search results:", data);
    return data;
  }

  const formik = useFormik({
    initialValues: {
      location: "",
      checkin: Today.toISOString().split("T")[0],
      checkout: Tomorrow.toISOString().split("T")[0],
      adults: 1,
      children: 0,
      rooms: 1,
    },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const results = await searchHotels({
          checkInDate: values.checkin,
          checkOutDate: values.checkout,
          city: values.location,
          token,
          numberOfRooms: values.rooms,
          adults: values.adults,
          children: values.children,
        });
        console.log("Results:", results);

        alert(`Found ${results.length || 0} hotels`);
      } catch (e: any) {
        console.error("Error:", e.message);
        alert("Failed to fetch hotels. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="w-full relative flex items-end justify-center searchbar h-auto">
      <div className="absolute inset-0 bg-black opacity-50 top-0 flex flex-col items-center justify-center p-4">
        <h2 className="text-white text-5xl font-bold text-center mt-15 font-jakarta">
          Unforgettable Journeys Await
        </h2>
        <p className="text-white text-center font-jakarta mt-4 text-lg">
          Discover and book luxury stays and experiences around the world.
        </p>
      </div>

      <article className="relative z-10 w-full pb-6 px-4 max-w-4xl">
        <form
          onSubmit={formik.handleSubmit}
          className="flex bg-white bg-opacity-90 rounded-xl p-4 space-y-4 justify-center items-center md:space-y-0 md:space-x-4 md:flex-row flex-col"
        >
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Hotels or cities..."
              onChange={formik.handleChange}
              value={formik.values.location}
              className="border-0 rounded-xl p-2 w-full bg-gray-200"
            />
          </div>

          <div>
            <label htmlFor="checkin">Check-in</label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              onChange={formik.handleChange}
              value={formik.values.checkin}
              min={formik.values.checkin}
              className="border-0 rounded-xl p-2 w-full bg-gray-200"
            />
          </div>

          <div>
            <label htmlFor="checkout">Check-out</label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              onChange={formik.handleChange}
              min={formik.values.checkin}
              value={formik.values.checkout}
              className="border-0 rounded-xl p-2 w-full bg-gray-200"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="adults">Adults, Children</label>
            <div className="flex space-x-4">
              <input
                type="number"
                id="adults"
                name="adults"
                min={1}
                value={formik.values.adults}
                onChange={formik.handleChange}
                className="border-0 rounded-xl p-2 w-full bg-gray-200"
              />
              <input
                type="number"
                id="children"
                name="children"
                min={0}
                value={formik.values.children}
                onChange={formik.handleChange}
                className="border-0 rounded-xl p-2 w-full bg-gray-200"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="rooms">Rooms</label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              min={1}
              value={formik.values.rooms}
              onChange={formik.handleChange}
              className="border-0 rounded-xl p-2 w-full bg-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-cyan-500 relative top-3 text-white rounded-xl p-2 w-full md:w-auto hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {formik.isSubmitting ? "Searching..." : "Search"}
          </button>
        </form>
      </article>
    </section>
  );
}
