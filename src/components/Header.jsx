<<<<<<< HEAD
import { Link, useLocation } from "react-router";

const Header = () => {
  const Location = useLocation();

  return (
    <>
      <main className=" bg-Bbackground py-4">
        <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
          {/* Logo and Title */}
          <h2 className="flex items-center">
            <img
              src="/src/assets/image/LV_Logo.png"
              alt="LV logo"
              className="w-16 h-16 mr-2 mb-1"
            />
            <span className="font-regular text-2xl text-LBackground">LVCC</span>
            <span className="font-Lato-Bold text-2xl text-LBackground pl-2 mb-1">
              AppointEase
            </span>
          </h2>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-10 text-[#000] relative left-40">
              <li
                className={`text-lg font-LatoRegular hover:text-LBackground ${
                  Location.pathname === "/home" ? "border-b-4 border-Gold" : ""
                }`}
              >
                <Link to="/home">HOME</Link>
              </li>
              <li
                className={`text-lg font-LatoRegular hover:text-LBackground ${
                  Location.pathname === "/about" ? "border-b-4 border-Gold" : ""
                }`}
              >
                <Link to="/about">ABOUT</Link>
              </li>
              <li
                className={`text-lg font-LatoRegular hover:text-LBackground ${
                  Location.pathname === "/faqs" ? "border-b-4 border-Gold" : ""
                }`}
              >
                <Link to="/faqs">FAQs</Link>
              </li>

              <li
                className={`text-lg font-LatoRegular hover:text-LBackground ${
                  Location.pathname === "/contact"
                    ? "border-b-4 border-Gold"
                    : ""
                }`}
              >
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
            <Link to="/appointmentForm?step=1">Appoint Now</Link>
          </button>
        </div>
      </main>
    </>
=======
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <main className="bg-Bbackground py-4">
      <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
        <h2 className="flex items-center">
          <img
            src="/src/assets/image/LV_Logo.png"
            alt="LV logo"
            className="w-16 h-16 mr-2 mb-1"
          />
          <span className="text-2xl text-LBackground font-regular">LVCC</span>
          <span className="font-Lato-Bold text-2xl text-LBackground pl-2 mb-1">
            AppointEase
          </span>
        </h2>

        <nav>
          <ul className="flex space-x-10 text-[#000] relative left-40">
            {["/home", "/about", "/faqs", "/contact"].map((link) => (
              <li key={link} className="text-lg font-LatoRegular">
                <Link
                  to={link}
                  className={`hover:text-LBackground ${
                    activeLink === link ? "border-b-2 border-orange-500" : ""
                  }`}
                >
                  {link.replace("/", "").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
          Appoint Now
        </button>
      </div>
    </main>
>>>>>>> 7bcd819adcf560811ac4fa19bfab16c71a15bbc3
  );
};

export default Header;
