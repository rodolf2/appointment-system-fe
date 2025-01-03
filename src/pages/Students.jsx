import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import Footer from "../components/registrar/Footer";
import Header from "../components/registrar/Header";

const Students = () => {
  return (
    <div>
      <Header />
      <Table />
      <Footer />
    </div>
  );
};

export default Students;
