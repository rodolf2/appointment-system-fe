import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import Sidebar from "/src/components/Sidebar";
import { FaSearch } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip"; // For tooltips
import useArchived from "./hooks/useArchived";

const Archived = () => {
  const {
    isSidebarOpen,
    appointments,
    isModalOpen,
    isBulkDeleteModalOpen,
    isRetrieveModalOpen,
    selectedAppointment,
    selectedRows,
    isDropdownOpen,
    toggleSidebar,
    openModal,
    closeModal,
    openBulkDeleteModal,
    closeBulkDeleteModal,
    openRetrieveModal,
    closeRetrieveModal,
    deleteAppointment,
    deleteBulkAppointments,
    retrieveAppointments,
    handleCheckboxChange,
    handleSelectAll,
    toggleDropdown,
    handleDropdownAction,
    retrieveAppointment,
    showSuccessDelete,
    setShowSuccessDelete,
    showSuccessRetrieve,
    setShowSuccessRetrieve,
  } = useArchived();

  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="h-auto">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Archived Appointments"
          />
          <div>
            <section className="h-[1200px] z-10 bg-white p-5 my-5">
              {/* Top section */}
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF ARCHIVED APPOINTMENTS
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[650px] my-3"></div>
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
                    <div className="relative">
                      <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="search"
                        type="search"
                        className="border-[#989898] py-2 bg-white text-[#161F55] mr-5 pl-8"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-y-auto m-4 mt-8">
                <table className="text-[18px] w-full">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-5">
                        <div className="flex items-center justify-center pl-4">
                          <input
                            type="checkbox"
                            checked={
                              selectedRows.length === appointments.length &&
                              appointments.length > 0
                            }
                            onChange={handleSelectAll}
                            className="w-5 h-5"
                          />
                          <div className="relative">
                            <button
                              onClick={toggleDropdown}
                              className="flex items-center justify-center"
                            >
                              <RiArrowDropDownLine className="text-[#161F55] text-2xl" />
                            </button>
                            {isDropdownOpen && (
                              <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-32 z-50">
                                <button
                                  onClick={() => handleDropdownAction("delete")}
                                  className="block w-full text-center px-4 py-2 text-[#161F55] hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => handleDropdownAction("return")}
                                  className="block w-full text-center px-4 py-2 text-[#161F55] hover:bg-gray-100"
                                >
                                  Retrieve
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                      <th className="border p-4 text-center">
                        TRANSACTION <br /> NUMBER
                      </th>
                      <th className="border p-4 text-center">REQUEST</th>
                      <th className="border p-4 text-center">
                        EMAIL <br /> ADDRESS
                      </th>
                      <th className="border p-4 text-center">
                        DATE OF <br /> APPOINTMENT
                      </th>
                      <th className="border p-4 text-center">TIME SLOT</th>
                      <th className="border p-4 text-center">
                        DATE OF <br /> REQUEST
                      </th>
                      <th className="border p-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((data) => (
                      <tr
                        key={data.id}
                        className={`text-[18px] ${
                          selectedRows.includes(data.id)
                            ? "bg-[#C2DBFF] !important"
                            : "even:bg-gray-100"
                        }`}
                      >
                        <td className="border p-4 text-center">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(data.id)}
                              onChange={() => handleCheckboxChange(data.id)}
                              className="w-5 h-5"
                            />
                          </div>
                        </td>
                        <td className="border p-4 text-center font-bold">
                          {data.transactionNumber}
                        </td>
                        <td className="border p-4 text-center">
                          {data.request}
                        </td>
                        <td className="border p-4 text-center">
                          {data.emailAddress}
                        </td>
                        <td className="border p-4 text-center">
                          {data.dateOfAppointment}
                        </td>
                        <td className="border p-4 text-center">
                          {data.timeSlot}
                        </td>
                        <td className="border p-4 text-center">
                          {data.dateOfRequest}
                        </td>
                        <td className="border p-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <div
                              data-tooltip-id="retrieve-tooltip"
                              data-tooltip-content="Retrieve"
                              className="bg-[#3A993D] p-2 rounded cursor-pointer hover:bg-green-700 transform scale-x-[-1]"
                              onClick={() => openRetrieveModal(data)}
                            >
                              <TbReload className="text-white" />
                            </div>
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

              {/* Pagination */}
              <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
                <span className="text-[#161F55]">
                  SHOWING {appointments.length} OF {appointments.length} ENTRIES
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

          {/* Single Delete Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to permanently delete this appointment?
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

          {/* Retrieve Confirmation Modal */}
          {isRetrieveModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to retrieve this appointment?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeRetrieveModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={retrieveAppointment}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Delete Message */}
          {showSuccessDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-xl font-semibold">
                  Appointment has been successfully deleted.
                </p>
              </div>
            </div>
          )}

          {/* Success Retrieve Message */}
          {showSuccessRetrieve && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-xl font-semibold">
                  Appointment has been successfully retrieved.
                </p>
              </div>
            </div>
          )}
          {/* Bulk Delete Modal */}
          {isBulkDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
              <div className="bg-white p-20 rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to delete the selected appointments?
                </h2>
                <div className="flex justify-center gap-10 mt-10">
                  <button
                    className="bg-gray-300 text-[#161F55] px-10 py-2 rounded-2xl"
                    onClick={closeBulkDeleteModal}
                  >
                    No
                  </button>
                  <button
                    className="bg-[#161F55] text-white px-10 py-2 rounded-2xl"
                    onClick={deleteBulkAppointments}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tooltips */}
          <Tooltip id="retrieve-tooltip" />
          <Tooltip id="delete-tooltip" />
        </main>
      </div>
    </div>
  );
};

export default Archived;
