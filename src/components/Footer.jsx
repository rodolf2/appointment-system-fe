import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-[#eef2f7] p-8 max-w-[1440px] h-[100px] mx-auto text-[#161F55] px-20 ">
        <div className="font-custom text-[25px] pl-0 mr-[350px] font-tolkien">
          LA VERDAD CHRISTIAN COLLEGE
        </div>
        <div>
          <p className="text-center p-1 text-[25px] font-lato">CONTACT US</p>
          <p className="text-center p-1 text-[15px] font-lato">
            support@laverdad.edu.ph
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
