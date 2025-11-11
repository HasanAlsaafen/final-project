import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
interface TrendingDestinationResponse {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}
function TrendingDestination() {
  const API = "https://hotel.foothilltech.net/api/home/destinations/trending";
  const [trends, setTrends] = useState<TrendingDestinationResponse[]>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(API);
        if (!response.ok) {
          throw new Error("An error occured");
        }
        const results: TrendingDestinationResponse[] = await response.json();
        setTrends(results);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  {
    if (error)
      return <p className="text-center text-red-500 mt-6">Error: {error}</p>;
  }

  return (
    <section
      aria-labelledby="trending-destination"
      className="flex flex-col flex-wrap justify-evenly px-4 py-6 sm:px-6 lg:px-12 xl:px-20"
    >
      <h2
        id="trending-destination"
        className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800"
      >
        Trending Destination{" "}
      </h2>
      <article className="flex flex-wrap items-center flex-col md:flex-row justify-evenly  gap-4 sm:gap-6 md:gap-8">
        {loading
          ? Array.from({ length: 4 }).map((item, i) => (
              <Card
                key={i}
                sx={{
                  maxWidth: 350,
                  minWidth: 300,
                  borderRadius: 5,
                  boxShadow: 2,
                }}
                className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]"
              >
                <Skeleton
                  variant="rectangular"
                  height={250}
                  data-testid="skeleton"
                />
                <CardContent>
                  <Skeleton width="40%" data-testid="skeleton" />
                </CardContent>
              </Card>
            ))
          : trends?.map((item) => (
              <Card
                className="relative"
                sx={{
                  maxWidth: 330,
                  minWidth: 330,
                  height: 250,
                  borderRadius: 3,
                  boxShadow: 1,
                }}
              >
                <img
                  className="relative h-full object-cover"
                  src={
                    item.thumbnailUrl ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                  }
                  alt={item.cityName}
                />

                <h4 className="absolute bottom-1 left-2 text-white z-1 font-semibold bg-black/50 backdrop-blur-sm rounded-2xl p-1 inline ">
                  {" "}
                  {item.countryName} , {item.cityName}
                </h4>
              </Card>
            ))}{" "}
      </article>
    </section>
  );
}

export default TrendingDestination;
