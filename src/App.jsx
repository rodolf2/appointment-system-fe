import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import HowToAppoint from "./pages/HowToAppoint";
import Guidelines from "./pages/Guidelines";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout />
      <Footer />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== "/";
  return (
    <>
      {/* {showHeaderFooter && <Header />} */}
      <Routes>
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/howtoappoint" element={<HowToAppoint />} />
        <Route path="/guidelines" element={<Guidelines />} />
      </Routes>
      {/* {showHeaderFooter && <Footer />}s */}
    </>
  );
};

export default App;
