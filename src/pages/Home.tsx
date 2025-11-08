import React from "react";
import NavBar from "../components/navbar/Navbar";
import Searchbar from "../components/searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

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
    </div>
  );
}

export default Home;
