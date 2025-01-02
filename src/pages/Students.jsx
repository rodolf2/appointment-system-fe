import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import Footer from "../components/registrar/Footer";
import Header from "../components/registrar/Header";

const Students = () => {
  return (
    <div
      className="max-w-[1440px] mx-auto h-[2000px]"
      style={{
        backgroundImage: "url('/src/assets/image/BackGround.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "1100px",
        mainHeight: "screen",
      }}
    >
      <Header />
      <SideBar />
      <Table />
      <Footer />
    </div>
  );
};

export default Students;
