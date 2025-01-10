import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Announcement from "./pages/Announcement";
import Hta from "./pages/Hta";
import Guidelines from "./pages/homepage/Guidelines";
import About from "./pages/homepage/About";
import Faqs from "./pages/homepage/Faqs";
import Contact from "./pages/homepage/Contact";
import AppointmentForm from "./pages/AppointmentForm";
import Students from "./pages/registrar/Students";
import Pending from "./pages/registrar/Pending";
import Approved from "./pages/registrar/Approved";
import SignIn from "./pages/registrar/Login/SignIn";
import SignUp from "./pages/registrar/Login/SignUp";
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
  ];
  const showHeaderFooter = !excludedPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Announcement />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="hta" element={<Hta />} />
          <Route path="guidelines" element={<Guidelines />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
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
