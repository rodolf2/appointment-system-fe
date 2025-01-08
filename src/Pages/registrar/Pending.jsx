import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa6";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown } from "react-icons/fa6";
import Sidebar from "/src/components/Sidebar";

const Pending = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}

      <div className="flex-1 overflow-y-auto">
        <main
          className=" max-w-[1440px] mx-auto h-auto"
          style={{
            backgroundImage: `url(${"public/assets/image/BackGround.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header className="flex justify-between items-center  bg-Bbackground h-[87px]">
            <div className="flex items-center">
              <div
                className={`flex-1 p-4 transition-margin duration-300 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <button
                  onClick={toggleSidebar}
                  className=" p-2 text-black rounded text-5xl font-bold"
                >
                  {isSidebarOpen ? <RxHamburgerMenu /> : <RxHamburgerMenu />}
                </button>
              </div>
              <h1 className="text-[20px] font-bold">
                Students/Alumni's Records
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <CgProfile className="text-5xl" />
              <span className="text-[20px] ">Juan Dela Cruz</span>
              <IoMdArrowDropdown className="text-5xl" />
            </div>
          </header>
          <div>
            <section className="h-[1200px] z-10 bg-white max-w-[1300px] mx-auto  p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-44 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF PENDING APPOINTMENT
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[720px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-16 ml-4 ">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show" className="mr-2">
                      SHOW
                    </label>
                    <select id="show" className="border p-1 bg-white">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                    <span className="ml-2">ENTRIES</span>
                  </div>
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="search" className="mr-2">
                      SEARCH:
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="border p-1 bg-white text-[#161F55] mr-5"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto m-4 mt-8">
                <table className="text-[18px] w-[1220px] border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-4">STATUS</th>
                      <th className="border p-4">
                        TRANSACTION
                        <br />
                        NUMBER
                      </th>
                      <th className="border p-4">REQUEST</th>
                      <th className="border p-4">
                        EMAIL <br />
                        ADDRESS
                      </th>
                      <th className="border p-4">
                        DATE OF
                        <br />
                        APPOINTMENT
                      </th>
                      <th className="border p-4">TIME SLOT</th>
                      <th className="border p-4">
                        DATE OF
                        <br />
                        REQUEST
                      </th>
                      <th className="border p-4">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        status: "PENDING",
                        transactionNumber: ["TR102938-123", "JUAN DELA CRUZ"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TTR122938-343", "MARC REYES"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR131238-534", "PAO LING"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR232352-536", "ANGELA DELEON"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR254393-678", "JED DELFIN"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR324693-786", "DENISE JULIA"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR382793-876", "MIKAELA KUSH"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                      {
                        status: "PENDING",
                        transactionNumber: ["TR38883-999", "SHELLA YING"],
                        request: "",
                        emailAddress: "",
                        dateOfAppointment: "",
                        timeSlot: "",
                        dateOfRequest: "",
                        actions: "2025-01-01",
                      },
                    ].map((data, index) => (
                      <tr key={index} className="even:bg-gray-100 text-[18px]">
                        <td className="border p-4">
                          <span className="bg-[#F3BC62] px-2 py-1 rounded text-white">
                            {data.status}
                          </span>
                        </td>
                        <td className="border p-4">
                          <div className="flex flex-col text-center">
                            <span className="text-[#354CCE]">
                              {data.transactionNumber[0]}
                            </span>{" "}
                            <span className="text-[#3A993D]">
                              {data.transactionNumber[1]}
                            </span>{" "}
                          </div>
                        </td>
                        <td className="border p-4">{data.request}</td>
                        <td className="border p-4">{data.emailAddress}</td>
                        <td className="border p-4">{data.dateOfAppointment}</td>
                        <td className="border p-4">{data.timeSlot}</td>
                        <td className="border p-4">{data.dateOfRequest}</td>
                        <td className="border p-4">
                          <div className="flex gap-2 justify-center">
                            <div className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700">
                              <FaThumbsUp className="text-white" />
                            </div>
                            <div className="bg-[#354CCE] p-2 rounded cursor-pointer hover:bg-blue-700">
                              <LuCircleCheckBig className="text-white" />
                            </div>
                            <div className="bg-[#D52121] p-2 rounded cursor-pointer hover:bg-red-700">
                              <FaThumbsDown className="text-white" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4 text-[18px] pl-4">
                <span className="text-[#161F55]">
                  SHOWING 1 TO 8 OF 6 ENTRIES
                </span>
                <div>
                  <button className="border p-1 text-[#161F55]">
                    Previous
                  </button>
                  <button className="border bg-[#161F55] text-[#D9D9D9] w-[40px] h-[35px]">
                    1
                  </button>
                  <button className="border p-1 text-[#161F55]">Next</button>
                </div>
              </div>
            </section>
          </div>

          <footer className="bg-Bbackground h-[70px] flex items-center justify-end pr-9 w-full">
            <p className="font-regular">LA VERDAD CHRISTIAN COLLEGE, INC.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Pending;
