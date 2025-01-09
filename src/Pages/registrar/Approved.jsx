import React, { useState } from "react";
import Footer from "/src/pages/registrar/components/Footer.jsx";
import Header from "/src/pages/registrar/components/Header.jsx";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown } from "react-icons/fa6";
import Sidebar from "/src/components/Sidebar";

const Approved = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [appointments, setAppointments] = useState([
    {
      status: "APPROVED",
      transactionNumber: ["TR112438-322 ", "JOSE DELA CRUZ"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "APPROVED",
      transactionNumber: ["TTR155938-883 ", "LUKAS GARCIA"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "APPROVED",
      transactionNumber: ["TR44368-444", "CELINE MARAJAS"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "APPROVED",
      transactionNumber: ["TTR26662-599", "JELA ELAURIA"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    //   {
    //     status: "PENDING",
    //     transactionNumber: ["TR254393-678", "JED DELFIN"],
    //     request: "",
    //     emailAddress: "",
    //     dateOfAppointment: "",
    //     timeSlot: "",
    //     dateOfRequest: "",
    //     actions: "2025-01-01",
    //   },
    //   {
    //     status: "PENDING",
    //     transactionNumber: ["TR324693-786", "DENISE JULIA"],
    //     request: "",
    //     emailAddress: "",
    //     dateOfAppointment: "",
    //     timeSlot: "",
    //     dateOfRequest: "",
    //     actions: "2025-01-01",
    //   },
    //   {
    //     status: "PENDING",
    //     transactionNumber: ["TR382793-876", "MIKAELA KUSH"],
    //     request: "",
    //     emailAddress: "",
    //     dateOfAppointment: "",
    //     timeSlot: "",
    //     dateOfRequest: "",
    //     actions: "2025-01-01",
    //   },
    //   {
    //     status: "PENDING",
    //     transactionNumber: ["TR38883-999", "SHELLA YING"],
    //     request: "",
    //     emailAddress: "",
    //     dateOfAppointment: "",
    //     timeSlot: "",
    //     dateOfRequest: "",
    //     actions: "2025-01-01",
    //   },
  ]);
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
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Approved Appointment"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white max-w-[1300px] mx-auto  p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-44 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF APPROVED APPOINTMENT
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
                      {/* <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option> */}
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
                    {appointments.map((data, index) => (
                      <tr key={index} className="even:bg-gray-100 text-[18px]">
                        <td className="border p-4">
                          <span className="bg-[#299057] px-2 py-2 rounded text-white">
                            {data.status}
                          </span>
                        </td>
                        <td className="border p-4">
                          <div className="flex flex-col text-center">
                            <span className="text-[#354CCE] font-bold">
                              {data.transactionNumber[0]}
                            </span>{" "}
                            <span className="text-[#3A993D] font-extrabold">
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
              <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
                <span className="text-[#161F55]">
                  SHOWING 1 TO 4 OF 1 ENTRIES
                </span>
                <div className="mr-6">
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

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Approved;
