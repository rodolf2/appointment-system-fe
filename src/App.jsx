import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Announcement from "./Pages/Announcement";
import Guidelines from "./Pages/Guidelines";
import LandingPage from "./landing/LandingPage";
import About from "./Pages/About";
import Faqs from "./Pages/Faqs";
import Contact from "./Pages/Contact";
import AppointmentForm from "./features/appointment/AppointmentForm";
import Hta from "./features/appointment/Hta";
import HomePage from "./Pages/HomePage";
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
import Appointments from "./features/admin/status/Appointments";
import Archived from "./features/admin/status/Archived";
import Attachment from "./appointmentForm/Attachment";
import AppSchedule from "./appointmentForm/AppSchedule";

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
    "/appointments",
    "/archived",
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
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/attachment" element={<Attachment />} />
          <Route path="/app-schedule" element={<AppSchedule />} />
        </Routes>
      </Layouts>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
