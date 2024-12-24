import { useState } from "react";
import Contact from "./components/Contact";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Faqs from "./components/Faqs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
