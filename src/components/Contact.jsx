import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";

const Contact = () => {
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
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                HOME
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                ABOUT
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground">
                FAQs
              </li>
              <li className="text-lg font-LatoRegular hover:text-LBackground relative">
                CONTACT
                <span className="absolute bottom-[-5px] left-0 w-full h-1 bg-[#F3BC62]"></span>
              </li>
            </ul>
          </nav>

          {/* Button */}
          <button className="px-6 py-3 bg-[#252F6A] text-[#FAFAFA] text-sm uppercase rounded-[10px] hover:bg-blue-700 relative right-3">
            Appoint Now
          </button>
        </div>
      </main>

      {/* CONTENT */}

      <section>
        <div className="relative">
          <img
            src="/src/assets/image/bg.png"
            alt="Image"
            className=" w-full h-full object-cover"
          />{" "}
          <span className="absolute inset-0 bg-OBackground opacity-30 "></span>
          <div className=" absolute inset-0 flex items-center justify-center  ">
            <h2 className=" text-Fwhite font-LatoBold h-[150px] text-[60px]">
              CONTACT US
            </h2>
          </div>
          <div className=" absolute inset-0 flex items-center justify-center mt-32">
            <p className=" text-Bbackground font-LatoRegular text-[30px] text-center w-[884px] tracking-wider">
              If you have any inquiries, require assistance, or wish to provide
              feedback, we are here to assist you
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0D1B39] text-Fwhite w-full h-auto py-10 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 px-10">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/src/assets/image/loc.png"
              alt="Location Map"
              className="w-[450px] lg:w-[455px] h-auto object-cover relative right-12"
            />
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative mt-8 right-32">
            <h2 className="text-[36px] font-LatoBold mb-16">GET IN TOUCH</h2>
            <span className="absolute top-16 left-0 w-80 h-1 bg-[#F3BC62]"></span>
            <div className="space-y-16">
              {/* Address */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <FaMapMarkerAlt className=" text-[24px]" />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  MacArthur Highway, Sampaloc, Apalit, Pampanga
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <FaPhoneAlt className="text-[24px]" />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  (+63) 947 9998 499
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <MdOutlineEmail className="text-[24px] relative top-0.5" />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  registrar@laverdad.edu.ph
                </p>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <FaFacebook className="text-[24px]" />
                </span>
                <a
                  href="https://www.facebook.com/lvcc.apalit "
                  target="_blank"
                  className="text-[24px] font-LatoRegular  hover:text-blue-400 text-Fwhite"
                  rel="noopener noreferrer"
                >
                  facebook.com/lvcc.apalit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className=" bg-Footer">
        <div className="flex justify-between items-center h-[130px] px-12">
          <p className="font-regular ml-12 text-[24px] text-LBackground ">
            LA VERDAD CHRISTIAN COLLEGE
          </p>
          <div className="flex flex-col items-center space-y-3 ">
            <p className="font-LatoRegular mr-2 text-[24px] text-LBackground ">
              CONTACT US
            </p>
            <p className=" text-[22px] font-LatoRegular text-LBackground">
              support@laverdad.edu.ph
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
