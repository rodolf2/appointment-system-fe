import { useState } from "react";
import { submitContactForm } from "../services/contactServices";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!name.trim()) {
      setNameError("This field is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("This field is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!subject.trim()) {
      setSubjectError("This field is required.");
      isValid = false;
    } else {
      setSubjectError("");
    }

    if (!message.trim()) {
      setMessageError("This field is required.");
      isValid = false;
    } else {
      setMessageError("");
    }

    if (!isValid) return;

    try {
      const formData = { name, email, subject, message };
      const result = await submitContactForm(formData);
      alert(result.message || "Form submitted successfully!");

      // Reset fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      alert(error.error || "Failed to submit the form.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <section>
        <div className="relative">
          <img
            src="/assets/image/bg.png"
            alt="Image"
            className="w-full h-full object-cover"
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

      {/* Contact Section */}
      <section className="bg-[#161F55] text-Fwhite w-full h-auto py-10">
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#121B52] lg:px-20 py-10 ">
          {/* Map Section */}
          <div className="w-full lg:w-1/2 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123347.40710675181!2d120.61418624335936!3d14.959002300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33965634a341dc6f%3A0x17091aa8b0043f89!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1737910779201!5m2!1sen!2sph"
              className="w-full h-full min-h-[500px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-[#FEFEFE] p-10 shadow-lg">
            <h2 className="text-[36px] font-LatoBold mb-2 text-[#161F55]">
              GET IN TOUCH
            </h2>
            <span className="block w-[15.5rem] h-1 bg-[#F3BC62] mb-8"></span>

            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block font-LatoRegular text-[25px] text-[#161F55] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim() !== "") setNameError("");
                    }}
                    className={`w-full px-4 py-2 border-2 rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 ${
                      nameError
                        ? "border-red-500"
                        : "border-[#425066] border-opacity-40"
                    }`}
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-1">{nameError}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError && validateEmail(e.target.value)) {
                        setEmailError("");
                      }
                    }}
                    className={`w-full px-4 py-2 border-2 rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 ${
                      emailError
                        ? "border-red-500"
                        : "border-[#425066] border-opacity-40"
                    }`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (e.target.value.trim() !== "") setSubjectError("");
                  }}
                  className={`w-full px-4 py-2 border-2 rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 ${
                    subjectError
                      ? "border-red-500"
                      : "border-[#425066] border-opacity-40"
                  }`}
                />
                {subjectError && (
                  <p className="text-red-500 text-sm mt-1">{subjectError}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#161F55] font-LatoRegular text-[25px] mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows="5"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.trim() !== "") setMessageError("");
                  }}
                  className={`w-full px-4 py-2 border-2 rounded-lg bg-white text-[#161F55] placeholder:text-[#000] placeholder:opacity-50 ${
                    messageError
                      ? "border-red-500"
                      : "border-[#425066] border-opacity-40"
                  }`}
                ></textarea>
                {messageError && (
                  <p className="text-red-500 text-sm mt-1">{messageError}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#161F55] text-Fwhite px-6 py-3 rounded-lg float-right hover:bg-[#0D133F] transition"
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
