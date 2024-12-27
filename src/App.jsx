import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import HowToAppoint from "./pages/HowToAppoint";
import Announcement from "./pages/Announcement";
import Guidelines from "./pages/Guidelines";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout />
      <Footer />
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
        <Route path="/" element={<Announcement />} />
        <Route path="/howtoappoint" element={<HowToAppoint />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/announcements" element={<Announcement />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default App;
