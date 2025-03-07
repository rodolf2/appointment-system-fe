const Footer = () => {
  return (
    <>
      <footer className=" bg-Footer">
        <div className="flex justify-between items-center h-[110px] px-12 ">
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-regular ml-8 text-[24px] text-LBackground ">
                LA VERDAD CHRISTIAN COLLEGE
              </p>
            </div>
          </div>

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

export default Footer;
