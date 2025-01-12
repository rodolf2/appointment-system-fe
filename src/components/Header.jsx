import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-Bbackground py-4">
      <div className="max-w-[1440px] h-14 mx-auto w-full flex justify-between items-center px-4">
        {/* Logo and Title */}
        <h2 className="flex items-center">
          <img
            src="/assets/image/LV_logo.png"
            alt="LV logo"
            className="w-16 h-16 mr-2 mb-1"
          />
          <span className="font-regular text-2xl text-LBackground">LVCC</span>
          <span className="font-LatoBold text-2xl text-LBackground pl-2 mb-1">
            AppointEase
          </span>
        </h2>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-10 text-[#000] relative left-40">
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/home")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/home">HOME</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/about")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/about">ABOUT</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/faqs")
                  ? "border-b-4 border-Gold"
                  : ""
              }`}
            >
              <Link to="/faqs">FAQs</Link>
            </li>
            <li
              className={`text-lg font-LatoRegular hover:text-LBackground ${
                location.pathname.startsWith("/contact")
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
    </header>
  );
};

export default Header;
