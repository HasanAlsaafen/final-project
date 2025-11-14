import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import SearchResults from "./pages/SearchResults";
export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/searchresults" element={<SearchResults />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
