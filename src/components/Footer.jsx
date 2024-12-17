import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-[#eef2f7] p-4 max-w-[1440px] h-[80px] mx-auto text-[#161f55]">
        <div className="font-custom text-2xl pl-0 mr-[350px] font-tolkien">
          LA VERDAD CHRISTIAN COLLEGE
        </div>
        <div>
          <p className="text-center p-1" id="contact-us">
            CONTACT US
          </p>
          <p className="text-center p-1" id="email">
            support@laverdad.edu.ph
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
