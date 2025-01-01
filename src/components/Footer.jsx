import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="flex justify-between items-center h-[130px] px-12 text-LBackground">
          <p className="ml-12 text-[24px] font-tolkien">
            LA VERDAD CHRISTIAN COLLEGE
          </p>
          <div className="flex flex-col items-center space-y-3 ">
            <p className=" mr-2 text-[24px] ">CONTACT US</p>
            <p className=" text-[22px] font-LatoRegular">
              support@laverdad.edu.ph
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
