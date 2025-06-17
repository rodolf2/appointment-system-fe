import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-Bbackground py-2 md:py-4 sticky top-0 z-50">
      <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
        {/* LEFT SIDE: Logo and Brand */}
        <div className="flex items-center group hover:opacity-80 transition-opacity">
          {" "}
          <Link to="/home/announcement" className="flex items-center">
            <img
              src="/assets/image/LV_logo.png"
              alt="LV logo"
              className="w-16 h-16 md:w-20 md:h-20 mr-2 mb-1 hover:scale-105 transition-transform"
            />
          </Link>
          <Link to="/home/announcement" className="flex items-center">
            <span className="font-regular text-xl md:text-2xl text-LBackground">
              LVCC
            </span>
            <span className="font-LatoRegular text-xl md:text-[26px] text-[#252F6A] pl-2 mb-1">
              AppointEase
            </span>
          </Link>
        </div>

        {/* RIGHT SIDE: Navigation and Actions */}
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6 lg:space-x-10">
              <li
                className={`text-base lg:text-lg font-LatoRegular hover:text-LBackground transition-colors ${
                  location.pathname.startsWith("/home")
                    ? "border-b-4 border-Gold"
                    : ""
                }`}
              >
                <Link to="/home/announcement">HOME</Link>
              </li>
              <li
                className={`text-base lg:text-lg font-LatoRegular hover:text-LBackground transition-colors ${
                  location.pathname.startsWith("/about")
                    ? "border-b-4 border-Gold"
                    : ""
                }`}
              >
                <Link to="/about">ABOUT</Link>
              </li>
              <li
                className={`text-base lg:text-lg font-LatoRegular hover:text-LBackground transition-colors ${
                  location.pathname.startsWith("/faqs")
                    ? "border-b-4 border-Gold"
                    : ""
                }`}
              >
                <Link to="/faqs">FAQs</Link>
              </li>
              <li
                className={`text-base lg:text-lg font-LatoRegular hover:text-LBackground transition-colors ${
                  location.pathname.startsWith("/contact")
                    ? "border-b-4 border-Gold"
                    : ""
                }`}
              >
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </nav>

          {/* Appoint Now Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/appointmentForm?step=1"
              className="inline-block px-4 lg:px-6 py-2 lg:py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 transition-colors font-medium"
            >
              Appoint Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center text-[#252F6A] p-2 rounded-lg md:hidden hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="px-4 py-2">
              <ul className="space-y-2">
                <li
                  className={`py-2 ${
                    location.pathname.startsWith("/home")
                      ? "text-LBackground"
                      : ""
                  }`}
                >
                  <Link to="/home/announcement" onClick={toggleMenu}>
                    HOME
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    location.pathname.startsWith("/about")
                      ? "text-LBackground"
                      : ""
                  }`}
                >
                  <Link to="/about" onClick={toggleMenu}>
                    ABOUT
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    location.pathname.startsWith("/faqs")
                      ? "text-LBackground"
                      : ""
                  }`}
                >
                  <Link to="/faqs" onClick={toggleMenu}>
                    FAQs
                  </Link>
                </li>
                <li
                  className={`py-2 ${
                    location.pathname.startsWith("/contact")
                      ? "text-LBackground"
                      : ""
                  }`}
                >
                  <Link to="/contact" onClick={toggleMenu}>
                    CONTACT
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/appointmentForm?step=1"
                    onClick={toggleMenu}
                    className="block w-full px-4 py-2 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] text-center hover:bg-blue-700 transition-colors"
                  >
                    Appoint Now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
