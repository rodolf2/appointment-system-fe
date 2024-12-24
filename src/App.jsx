import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import HowToAppoint from "./pages/HowToAppoint";
import LandingPage from "./pages/LandingPage";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Home from "./pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <HowToAppoint />
      <Footer />
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
        <Route path="/aboutus" element={<About />} />
        <Route path="/howtoappoint" element={<HowToAppoint />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
