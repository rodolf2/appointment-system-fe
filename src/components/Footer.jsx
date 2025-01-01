import React from "react";

const Footer = () => {
  return (
    <>
      <footer className=" bg-Footer h-[130px] max-w-[1440px] mx-auto flex justify-between items-center px-12 text-LBackground">
        <p className="ml-12 text-[24px] font-regular">
          LA VERDAD CHRISTIAN COLLEGE
        </p>
        <div className="flex flex-col items-center space-y-3 ">
          <p className=" mr-2 text-[24px] font-LatoRegular">CONTACT US</p>
          <p className=" text-[22px] font-LatoRegular">
            support@laverdad.edu.ph
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
