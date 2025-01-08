import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Announcement from "./Pages/Announcement";
import Guidelines from "./Pages//homepage/Guidelines";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/homepage/About";
import Faqs from "./Pages//homepage/Faqs";
import Contact from "./Pages/homepage/Contact";
import AppointmentForm from "./Pages/AppointmentForm";
import Hta from "./Pages/HTA";
import HomePage from "./Pages/homepage/HomePage";
import Students from "./Pages/registrar/Students";
import Pending from "./Pages/registrar/Pending";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const excludedPaths = ["/", "/appointmentForm", "/students", "/pending"];
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
        <Route path="/students" element={<Students />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
