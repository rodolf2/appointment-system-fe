import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Contact from "./Pages/Contact";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import Faqs from "./Pages/Faqs";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import AppointmentForm from "./Pages/AppointmentForm";

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
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
