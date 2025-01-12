import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useState } from "react";
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
import Schedule from "./pages/registrar/Schedule";
import Holidays from "./pages/registrar/Holidays";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <BrowserRouter>
      <Layout
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </BrowserRouter>
  );
};

const Layout = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
  const showSidebar = !excludedPaths.includes(location.pathname);

  return (
    <div className="flex">
      {showSidebar && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={setIsSidebarOpen}
        />
      )}
      <div
        className={`flex-1 transition-all ${isSidebarOpen ? "ml-0" : "ml-0"}`}
      >
        {showHeaderFooter && <Header />}
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
        </Routes>
        {showHeaderFooter && <Footer />}
      </div>
    </div>
  );
};

export default App;
