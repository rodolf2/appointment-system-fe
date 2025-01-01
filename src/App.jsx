import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Announcement from "./Pages/Announcement";
import Guidelines from "./Pages/Guidelines";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import Faqs from "./Pages/Faqs";
import Contact from "./Pages/Contact";
import AppointmentForm from "./Pages/AppointmentForm";
import Hta from "./Pages/HTA";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const excludedPaths = ["/", "/appointmentForm"];
  const showHeaderFooter = !excludedPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/hta" element={<Hta />} />
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
