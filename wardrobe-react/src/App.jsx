import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet }
  from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Wardrobe from "./pages/Wardrobe";
import Outfits from "./pages/Outfits";
import Profile from "./pages/Profile";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;