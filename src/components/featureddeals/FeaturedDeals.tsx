import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CiStar } from "react-icons/ci";
import CardActionArea from "@mui/material/CardActionArea";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
interface Hotel {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

function FeaturedDeals() {
  const API = "https://hotel.foothilltech.net/api/home/featured-deals";
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(API);
        if (!response.ok) throw new Error("An error occurred!");
        const results: Hotel[] = await response.json();
        if (isMounted) setHotels(results);
      } catch (e: any) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error)
    return <p className="text-center text-red-500 mt-6">Error: {error}</p>;

  return (
    <section className="flex flex-col flex-wrap justify-evenly px-4 py-6 sm:px-6 lg:px-12 xl:px-20">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Featured Deals
      </h2>

      <article className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
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
                  height={200}
                  data-testid="skeleton"
                />
                <CardContent>
                  <Skeleton width="40%" data-testid="skeleton" />
                  <Skeleton width="80%" data-testid="skeleton" />
                  <Skeleton width="60%" data-testid="skeleton" />
                </CardContent>
              </Card>
            ))
          : hotels.map((deal) => (
              <Card
                key={deal.hotelId}
                sx={{
                  maxWidth: 350,
                  minWidth: 300,
                  borderRadius: 5,
                  boxShadow: 2,
                }}
                className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] transition-transform hover:scale-105"
              >
                <CardActionArea sx={{ borderRadius: 3, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={deal.roomPhotoUrl}
                    alt={deal.title}
                    sx={{
                      objectFit: "cover",
                      height: 200,
                      width: "100%",
                    }}
                  />
                  <CardContent className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {deal.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                      {deal.cityName}
                    </p>
                    <div className="flex items-center text-blue-500 mt-1">
                      {Array.from({ length: deal.hotelStarRating }, (_, i) => (
                        <CiStar key={i} />
                      ))}
                    </div>
                  </CardContent>

                  <article className="flex justify-between items-center px-3 sm:px-4 md:px-5 pb-3">
                    <span className="text-blue-400 font-semibold text-sm sm:text-base">
                      ${deal.finalPrice}
                      <span className="text-black font-extralight text-xs sm:text-sm">
                        /night
                      </span>
                    </span>
                    <span className="font-semibold text-gray-400 line-through text-xs sm:text-sm">
                      ${deal.originalRoomPrice}
                    </span>
                  </article>
                </CardActionArea>
              </Card>
            ))}
      </article>
    </section>
  );
}

export default FeaturedDeals;
