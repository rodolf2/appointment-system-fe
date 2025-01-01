import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import HowToAppoint from "./pages/HowToAppoint";
import Guidelines from "./pages/Guidelines";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Faqs from "./components/Faqs";
import Contact from "./components/Contact";
const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== "/";
  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/howtoappoint" element={<HowToAppoint />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {showHeaderFooter && <Footer />}s
    </>
  );
};

export default App;
