import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import Sidebar from "/src/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { Tooltip } from "react-tooltip"; // For tooltips
import useAppointment from "./hooks/useAppointment";

const Appointments = () => {
  const {
    isSidebarOpen,
    selectedFilter,
    appointments,
    isModalOpen,
    toggleSidebar,
    getStatusColor,
    getTransactionNumberColor,
    handleFilterChange,
    filteredAppointments,
    openModal,
    closeModal,
    deleteAppointment,
    approveAppointment,
    rejectAppointment,
    completeAppointment,
  } = useAppointment();
  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[150px]"}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="h-auto">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Approved Appointment"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF APPOINTMENTS
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[450px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-[78px] ml-4 ">
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
                  <div className="text-[#161F55] font-semibold text-[18px] flex gap-4">
                    <div>
                      <select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="bg-white border-2 border-gray-300 px-2 text-gray-400 py-2"
                      >
                        <option value="Filter by">Filter by</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="relative">
                      <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="search"
                        type="search"
                        className="border-[#989898] py-2 bg-white text-[#161F55] mr-5 pl-8" // Add padding-left (pl-8) to make space for the icon
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto m-4 mt-8">
                <table className="text-[18px] w-full">
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
                    {filteredAppointments.map((data, index) => (
                      <tr key={index} className="even:bg-gray-100 text-[18px]">
                        <td className="border p-4 text-center">
                          <span
                            className={`inline-block w-[120px] text-center px-2 py-2 rounded text-white ${getStatusColor(
                              data.status
                            )}`}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td className="border p-4">
                          <div className="flex flex-col text-center">
                            <span
                              className={`font-bold ${getTransactionNumberColor(
                                data.status
                              )}`}
                            >
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
                            {/* Approve Button */}
                            <div
                              data-tooltip-id="approve-tooltip"
                              data-tooltip-content="Approve"
                              className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700"
                              onClick={() => approveAppointment(data)}
                            >
                              <FaThumbsUp className="text-white" />
                            </div>
                            {/* Complete Button */}
                            <div
                              data-tooltip-id="complete-tooltip"
                              data-tooltip-content="Complete"
                              className="bg-[#354CCE] p-2 rounded cursor-pointer hover:bg-blue-700"
                              onClick={() => completeAppointment(data)}
                            >
                              <LuCircleCheckBig className="text-white" />
                            </div>
                            {/* Reject Button */}
                            <div
                              data-tooltip-id="reject-tooltip"
                              data-tooltip-content="Reject"
                              className="bg-[#D52121] p-2 rounded cursor-pointer hover:bg-red-700"
                              onClick={() => rejectAppointment(data)}
                            >
                              <FaThumbsDown className="text-white transform scale-x-[-1]" />
                            </div>
                            {/* Delete Button */}
                            <div
                              data-tooltip-id="delete-tooltip"
                              data-tooltip-content="Delete"
                              className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                              onClick={() => openModal(data)}
                            >
                              <BsTrash3 className="text-white" />
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
                  SHOWING {filteredAppointments.length} OF {appointments.length}{" "}
                  ENTRIES
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

          {/* Delete Confirmation Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to delete this appointment?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={deleteAppointment}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tooltips */}
          <Tooltip id="approve-tooltip" />
          <Tooltip id="complete-tooltip" />
          <Tooltip id="reject-tooltip" />
          <Tooltip id="delete-tooltip" />
        </main>
      </div>
    </div>
  );
};

export default Appointments;
