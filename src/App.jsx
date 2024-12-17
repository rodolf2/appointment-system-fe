import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router";
import HowToAppoint from "./pages/HowToAppoint";

function App() {
  return (
    <>
      <Header />
      <About />
      {/* <HowToAppoint /> */}
      <Footer />
    </>
  );
}

export default App;
