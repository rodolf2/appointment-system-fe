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
          />
          <span className="absolute inset-0 bg-OBackground opacity-30"></span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-Fwhite font-LatoBold h-[150px] text-[60px]">
              CONTACT US
            </h2>
          </div>
          <div className="absolute inset-0 flex items-center justify-center mt-32">
            <p className="text-Bbackground font-LatoRegular text-[30px] text-center w-[884px] tracking-wider">
              If you have any inquiries, require assistance, or wish to provide
              feedback, we are here to assist you
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#161F55] text-Fwhite w-full h-auto py-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center px-32">
          {/* Map Section */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123347.40710675181!2d120.61418624335936!3d14.959002300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33965634a341dc6f%3A0x17091aa8b0043f89!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1737910779201!5m2!1sen!2sph"
            width="50%"
            height="610"
            style={{ border: 0 }}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>

          {/* Contact Form Section */}
          <div className="w-full h-[610px] lg:w-1/2 bg-[#FEFEFE] p-10  shadow-lg">
            <h2 className="text-[36px] font-LatoBold mb-2 text-[#161F55]">
              GET IN TOUCH
            </h2>
            <span className="block w-[15.5rem] h-1 bg-[#F3BC62] mb-8"></span>

            <form className="space-y-2 ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block font-LatoRegular text-[25px] text-[#161F55] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 border-[#425066] border-opacity-40 "
                  />
                </div>

                <div>
                  <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 border-[#425066] border-opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 border rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 border-[#425066] border-opacity-40"
                />
              </div>

              <div>
                <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 border-[#425066] border-opacity-40"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#161F55] text-Fwhite px-6 py-3 rounded-lg float-right hover:bg-[#0D133F] transition placeholder:text-[#000] placeholder:opacity-50 border-[#425066] border-opacity-40"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
