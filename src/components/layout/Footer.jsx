import { CiFacebook } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer className="bg-Footer">
      <div className="flex justify-between items-center h-[200px] px-12">
        <div>
          <p className="flex items-center font-regular ml-8 text-[32px] text-LBackground">
            <img
              src="/assets/image/LV_logo.png"
              alt="LV Logo"
              className="w-20 h-20 mr-2 mb-1"
            />
            LA VERDAD CHRISTIAN COLLEGE
          </p>
          <p className="text-[14px] w-[510px] font-LatoRegular text-LBackground ml-[7.5rem]">
            Seamless appointment management—stay organized, save time, and never
            miss an appointment with ease and efficiency.
          </p>
        </div>

        {/* Aligning both "Follow Us" and "Contact Us" in a similar manner */}
        <div className="flex flex-col items-center space-y-3 ml-52">
          <p className="font-LatoRegular text-[24px] text-LBackground">
            FOLLOW US
          </p>
          <div className="flex justify-center items-center space-x-3">
            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/lvcc.apalit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <CiFacebook className="text-Primary w-10 h-10 hover:text-PrimaryDark transition-colors" />
            </a>

            {/* Email Link */}
            <a
              href="mailto:support@laverdad.edu.ph"
              aria-label="Send us an email"
            >
              <TfiEmail className="text-Primary w-8 h-8 hover:text-PrimaryDark transition-colors" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3 pr-12 mt-14">
          <p className="font-LatoRegular text-[24px] text-LBackground">
            CONTACT US
          </p>
          <div className="text-center">
            <p className="text-[14px] font-LatoRegular text-LBackground">
              support@laverdad.edu.ph
            </p>
            <p className="text-[14px] font-LatoRegular text-LBackground">
              +639479998499
            </p>
            <p className="text-[14px] w-[200px] font-LatoRegular text-LBackground">
              Mac Arthur High-way, Sampaloc, Apalit, Pampanga
            </p>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-Primary opacity-50 w-[90%] m-auto p-4"></div>
      <p className="text-center py-8">
        © 2024 . La Verdad Christian College, Inc.
      </p>
    </footer>
  );
};

export default Footer;
