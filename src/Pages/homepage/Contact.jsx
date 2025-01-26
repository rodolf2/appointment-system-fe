import location_icon from "/icons/marker-06.png";
import phone_icon from "/icons/phone.png";
import mail_icon from "/icons/mail-03.png";
import fb_icon from "/icons/fb logo.png";

const Contact = () => {
  return (
    <>
      {/* CONTENT */}
      <section>
        <div className="relative">
          <img
            src="/assets/image/bg.png"
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
      <section className="bg-[#161F55] text-Fwhite w-full h-auto py-10 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 px-10">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/assets/image/loc.png"
              alt="Location Map"
              className="w-[450px] lg:w-[455px] h-auto object-cover relative right-8"
            />
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative mt-8 right-20">
            <h2 className="text-[36px] font-LatoBold mb-16">GET IN TOUCH</h2>
            <span className="absolute top-16 left-0 w-80 h-1 bg-[#F3BC62]"></span>
            <div className="space-y-16">
              {/* Address */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <img
                    className="text-[24px]"
                    src={location_icon}
                    alt="Location Icon"
                    width={50}
                    height={50}
                  />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  MacArthur Highway, Sampaloc, Apalit, Pampanga
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <img
                    className="text-[24px]"
                    src={phone_icon}
                    alt="Phone Icon"
                    width={50}
                    height={50}
                  />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  (+63) 947 9998 499
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <img
                    className="text-[24px]"
                    src={mail_icon}
                    alt="Mail Icon"
                    width={50}
                    height={50}
                  />
                </span>
                <p className="text-[24px] font-LatoRegular text-Fwhite">
                  registrar@laverdad.edu.ph
                </p>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-lg">
                  <img
                    className="text-[24px]"
                    src={fb_icon}
                    alt="Facebook Icon"
                    width={50}
                    height={50}
                  />
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
    </>
  );
};

export default Contact;
