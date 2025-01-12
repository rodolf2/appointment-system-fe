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
import Approved from "./Pages/registrar/Approved";
import SignIn from "./Pages/registrar/Login/SignIn";
import SignUp from "./Pages/registrar/Login/SignUp";
import Rejected from "./pages/registrar/Rejected";
import Completed from "./pages/registrar/Completed";
import RegistrarHome from "./Pages/registrar/Dashboard/RegistrarHome";
import Events from "./Pages/registrar/Dashboard/Events";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const excludedPaths = [
    "/",
    "/appointmentForm",
    "/students",
    "/pending",
    "/approved",
    "/signin",
    "/signup",
    "/rejected",
    "/completed",
    "/registrarHome",
    "/events",
    "/schedule",
    "/holidays",
  ];
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
        <Route path="/approved" element={<Approved />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/registrarHome" element={<RegistrarHome />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
