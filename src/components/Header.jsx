const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-[#eef2f7] py-4 px-20 max-w-[1440px] h-[80px] mx-auto">
        <div className="flex items-center">
          <img src="/image/LOGO.png" alt="LOGO" className="h-[75px]" />
          <h1 className="text-[26px] font-tolkien text-[#252f6a] ml-4">
            LVCC <span className="font-lato">AppointEase</span>
          </h1>
        </div>
        <div className="flex space-x-8">
          <ul className="flex gap-10 items-center">
            <li className="hover:bg-gray-300">HOME</li>
            <li className="hover:bg-gray-300">ABOUT</li>
            <li className="hover:bg-gray-300">FAQs</li>
            <li className="hover:bg-gray-300">CONTACT</li>
            <li className="bg-primary text-white p-3 rounded-md hover:bg-blue-500">
              APPOINT NOW
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
