import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Announcement from "./pages/Announcement";
import Guidelines from "./pages/Guidelines";
import LandingPage from "./landing/LandingPage";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import AppointmentForm from "./features/appointment/AppointmentForm";
import HowToAppoint from "./pages/HowToAppoint.jsx";
import HomePage from "./pages/HomePage";
import Students from "./features/admin/status/Students";
import SignIn from "./features/admin/Login/SignIn";
import SignUp from "./features/admin/Login/SignUp";
import ForgotPassword from "./features/admin/Login/forgotpassword";
import NewPassword from "./features/admin/Login/Newpassword";
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
import TransitionWrapper from "./components/TransitionWrapper";
import Feedback from "./features/admin/status/Feedback.jsx";
import Announcements from "./features/admin/status/Announcements.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthProvider from "./components/AuthProvider.jsx";

const App = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </UserProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const excludedPaths = [
    "/",
    "/appointmentForm",
    "/students",
    "/signin",
    "/signup",
    "/forgot-password",
    "/new-password",
    "/registrarHome",
    "/events",
    "/schedule",
    "/holidays",
    "/profile",
    "/appointments",
    "/archived",
    "/feedback",
    "/announcements",
  ];
  const showHeaderFooter = !excludedPaths.includes(location.pathname);

  return (
    <>
      <Layouts>
        <TransitionWrapper delay={200}>
          {showHeaderFooter && <Header />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />}>
              <Route index element={<Announcement />} />
              <Route path="announcement" element={<Announcement />} />
              <Route path="how_to_appoint" element={<HowToAppoint />} />
              <Route path="guidelines" element={<Guidelines />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointmentForm" element={<AppointmentForm />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/how_to_appoint" element={<HowToAppoint />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/students" element={<Students />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-password" element={<NewPassword />} />

            {/* Protected Admin Routes */}
            <Route
              path="/registrarHome"
              element={
                <ProtectedRoute>
                  <RegistrarHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/holidays"
              element={
                <ProtectedRoute>
                  <Holidays />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/archived"
              element={
                <ProtectedRoute>
                  <Archived />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements"
              element={
                <ProtectedRoute>
                  <Announcements />
                </ProtectedRoute>
              }
            />

            {/* Non-protected routes */}
            <Route path="/attachment" element={<Attachment />} />
            <Route path="/app-schedule" element={<AppSchedule />} />
          </Routes>
          {showHeaderFooter && <Footer />}
        </TransitionWrapper>
      </Layouts>
    </>
  );
};

export default App;
