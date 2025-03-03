import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown } from "react-icons/fa6";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import Sidebar from "/src/components/Sidebar";

const Pending = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const appointments = [
    {
      status: "PENDING",
      transactionNumber: ["TR102938-123"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TTR122938-343"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR131238-534"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR232352-536"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR254393-678"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR324693-786"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR382793-876"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR38883-999"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
  ];
  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && (
        <div>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <main
          className="h-auto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(22, 31, 85, 0.7), rgba(22, 31, 85, 0.7)), url(${"/assets/image/BackGround.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Pending Appointment"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white max-w-[1100px] mx-auto  p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-44 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF PENDING APPOINTMENT
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[600px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-16 ml-4 ">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show" className="mr-2">
                      SHOW
                    </label>
                    <input
                      type="number"
                      min={"0"}
                      max={"6"}
                      defaultValue={"1"}
                      className="text-center always-show-spinner"
                    />
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
                          <span className="bg-[#F3BC62] px-2 py-2 rounded text-white">
                            {data.status}
                          </span>
                        </td>
                        <td className="border p-4">
                          <div className="flex flex-col text-center">
                            <span className="text-[#354CCE] font-bold">
                              {data.transactionNumber}
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
                              <FaThumbsDown className="text-white transform scale-x-[-1]" />
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
                  SHOWING 1 TO 8 OF 6 ENTRIES
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

export default Pending;
