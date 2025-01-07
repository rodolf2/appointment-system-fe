import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import HowToAppoint from "./pages/HowToAppoint";
import Students from "./pages/Students.jsx";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Students />
      {/* <Footer />s */}
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
