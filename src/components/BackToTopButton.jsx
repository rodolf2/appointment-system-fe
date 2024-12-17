import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { NavLink, Link } from "react-router";

const BackToTopButton = () => {
  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button className="rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center object-left">
          <FaArrowUpLong className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default BackToTopButton;
