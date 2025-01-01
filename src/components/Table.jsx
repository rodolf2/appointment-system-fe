import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/firebase.js"; // Import your Firebase configuration

const Table = () => {
  return (
    <div className="w-[1000px] h-[500px] bg-red-500">
      <p>Basta Table to!</p>
    </div>
  );
};

export default Table;
