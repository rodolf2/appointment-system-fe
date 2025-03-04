import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Announcement from "./Pages/Announcement";
import Guidelines from "./features/homepage/Guidelines";
import LandingPage from "./features/landing/LandingPage";
import About from "./features/homepage/About";
import Faqs from "./features/homepage/Faqs";
import Contact from "./features/homepage/Contact";
import AppointmentForm from "./features/appointment/AppointmentForm";
import Hta from "./features/appointment/Hta";
import HomePage from "./features/homepage/HomePage";
import Students from "./features/admin/status/Students";
import Pending from "./features/admin/status/Pending";
import Approved from "./features/admin/status/Approved";
import SignIn from "./features/admin/Login/SignIn";
import SignUp from "./features/admin/Login/SignUp";
import Rejected from "./features/admin/status/Rejected";
import Completed from "./features/admin/status/Completed";
import RegistrarHome from "./features/admin/Dashboard/RegistrarHome";
import Events from "./features/admin/Dashboard/Events";
import Schedule from "./features/admin/status/Schedule";
import Holidays from "./features/admin/status/Holidays";
import Profile from "./features/admin/components/Profile";
import Layouts from "./components/Layout";

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
    "/profile",
  ];
  const showHeaderFooter = !excludedPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Layouts>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />}>
            <Route index element={<Announcement />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="hta" element={<Hta />} />
            <Route path="guidelines" element={<Guidelines />} />
          </Route>
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
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layouts>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
