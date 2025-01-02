import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase.js"; // Import your Firebase configuration

const Table = () => {
  return (
    <div className="w-[1300px] min-h-[1000px] bg-red-500 mx-auto mt-5">
      <div className="bg-[#D9D9D9] h-[169px] p-9">
        <h1 className="text-3xl">LIST OF STUDENTS/ALUMNI'S RECORDS</h1>
        <div className="border-b-[5px] border-[#F3BC62] my-3 w-[600px] tracking-wider"></div>
      </div>
    </div>
  );
};

export default Table;
