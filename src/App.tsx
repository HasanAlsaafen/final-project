import Home from "./pages/Home";
import Login from "./pages/Login";
import {  Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
