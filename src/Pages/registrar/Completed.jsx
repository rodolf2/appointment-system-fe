import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import Footer from "/src/pages/registrar/components/Footer.jsx";
import Header from "/src/pages/registrar/components/Header.jsx";
import Sidebar from "/src/components/Sidebar";

const Rejected = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      status: "REJECTED",
      transactionNumber: ["TR13234-322", "KARLA MERCADO"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
    },
    {
      status: "REJECTED",
      transactionNumber: ["TR444938-432 ", "YEHLEN HAMAYA"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
    },
    // Add more appointments as needed
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const deleteAppointment = () => {
    setAppointments(
      appointments.filter((appt) => appt !== selectedAppointment)
    );
    closeModal();
  };

  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}

      <div className="flex-1 overflow-y-auto">
        <main
          className="max-w-[1440px] mx-auto h-auto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(22, 31, 85, 0.7), rgba(22, 31, 85, 0.7)), url(${"public/assets/image/BackGround.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Completed Appointment"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white max-w-[1300px] mx-auto p-5 my-5">
              <div className="bg-[#D9D9D9] h-44 m-4">
                <div className="text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF COMPLETED APPOINTMENT
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[720px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-16 ml-4">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show" className="mr-2">
                      SHOW
                    </label>
                    <input
                      type="number"
                      min={"0"}
                      max={"10"}
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
                          <span className="bg-[#354CCE] px-2 py-2 rounded text-white">
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
                            <div className="bg-[#D52121] p-2 rounded cursor-pointer hover:bg-red-700">
                              <BsTrash3
                                className="text-white"
                                onClick={() => openModal(data)}
                              />
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
                  SHOWING 1 TO 2 OF 1 ENTRIES
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this appointment?
            </h2>
            <div className="flex justify-between gap-4 mt-10">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-8 py-2 rounded-2xl"
                onClick={deleteAppointment}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rejected;
