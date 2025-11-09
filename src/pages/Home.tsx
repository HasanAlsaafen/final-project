import React from "react";
import NavBar from "../components/navbar/Navbar";
import Searchbar from "../components/searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import FeaturedDeals from "../components/featureddeals/FeaturedDeals";
import TrendingDestination from "../components/trendingdestination/TrendingDestination";
import Footer from "../components/footer/Footer";
function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div>
      <NavBar />
      <Searchbar />
      <FeaturedDeals />
      <TrendingDestination />
      <Footer />
    </div>
  );
}

export default Home;
