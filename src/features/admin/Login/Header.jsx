import React from "react";

const Header = () => {
  return (
    <header className="flex items-center absolute p-5">
      <img
        src="/assets/image/LV_logo.png"
        alt="LV logo"
        className="w-16 h-16 mr-4"
      />
      <h1 className="text-2xl text-white">
        <span className="font-regular">LVCC</span>{" "}
        <span className="font-LatoSemiBold">AppointEase</span>
      </h1>
    </header>
  );
};

export default Header;
