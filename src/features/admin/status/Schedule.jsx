// import { IoMdArrowDropdown } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import { Tooltip } from "react-tooltip"; // For tooltips
import useSchedule from "./hooks/useSchedule";

const Schedule = () => {
  const {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    editIndex,
    isDeleteModalOpen,
    deleteIndex,
    newSchedule,
    schedules,
    toggleSidebar,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    saveScheduleChanges,
    setSchedules,
    formatDate,
    formatTime,
    addSchedule,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useSchedule();
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
            title="Schedule Records"
          />
          <section className="h-[1200px] z-10 bg-white p-5 my-5">
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2">
              <div className="text-[#161F55] flex justify-between px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF SCHEDULES
                  <div className="border-b-4 border-[#F3BC62] w-[360px] my-3"></div>
                </h2>
                <div>
                  <button
                    className="bg-[#161F55] text-white px-5 py-1 mt-2 mr-2 rounded-md hover:bg-blue-800"
                    onClick={openAddModal}
                  >
                    + ADD
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-16 ml-4">
                <div className="text-[#161F55] font-semibold text-[18px]">
                  <label htmlFor="show" className="mr-2">
                    SHOW
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
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
            <table className="text-[18px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-4">NO.</th>
                  <th className="border p-4">SLOTS</th>
                  <th className="border p-4">DATE</th>
                  <th className="border p-4">START TIME</th>
                  <th className="border p-4">END TIME</th>
                  <th className="border p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 9 }).map((_, rowIndex) => {
                  const schedule = schedules[rowIndex]; // Check if there's a schedule for the current rowIndex
                  return (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-gray-100" : ""
                      } text-center`}
                    >
                      <td className="border p-5">{schedule?.no || ""}</td>
                      <td className="border p-5">{schedule?.slots || ""}</td>
                      <td className="border p-5">{schedule?.date || ""}</td>
                      <td className="border p-5">
                        {schedule?.startTime || ""}
                      </td>
                      <td className="border p-5">{schedule?.endTime || ""}</td>
                      <td className="border p-5">
                        {schedule ? (
                          <div className="flex gap-2 justify-center">
                            <div
                              data-tooltip-id="edit-tooltip"
                              data-tooltip-content="Edit"
                              className="bg-[#CF5824] p-2 rounded cursor-pointer hover:bg-orange-700"
                              onClick={() => openEditModal(rowIndex)}
                            >
                              <FaEdit className="text-white" />
                            </div>
                            <div
                              data-tooltip-id="delete-tooltip"
                              data-tooltip-content="Delete"
                              className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                              onClick={() => openDeleteModal(rowIndex)}
                            >
                              <BsTrash3 className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="h-9"></div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
              <span className="text-[#161F55]">
                SHOWING 1 TO 10 OF 10 ENTRIES
              </span>
              <div className="mr-6">
                <button className="border p-1 text-[#161F55]">Previous</button>
                <button className="border bg-[#161F55] text-[#D9D9D9] w-[40px] h-[35px]">
                  1
                </button>
                <button className="border p-1 text-[#161F55]">Next</button>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl tracking-wider font-LatoBold text-[#161f55] mb-2">
              ADD SCHEDULE
            </h2>
            <div className="border-b-4 border-[#F3BC62] w-[170px] my-2"></div>
            <div className="w-96 mt-4">
              <p>SLOTS</p>
              <input
                name="slots"
                type="number"
                value={newSchedule.slots}
                onChange={handleInputChange}
                placeholder="Enter number of slots"
                className="border w-full p-2 mb-2"
              />
              <p>DATE</p>
              <input
                name="date"
                type="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="border w-full p-2 mb-2"
              />
              <p>START TIME</p>
              <input
                name="startTime"
                type="time"
                value={newSchedule.startTime}
                onChange={handleInputChange}
                placeholder="Start Time"
                className="border w-full p-2 mb-2"
              />
              <p>END TIME</p>
              <input
                name="endTime"
                type="time"
                value={newSchedule.endTime}
                onChange={handleInputChange}
                placeholder="End Time"
                className="border w-full p-2 mb-2"
              />
            </div>
            <div className="flex justify-center gap-10 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl"
                onClick={addSchedule}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Update Schedule</h2>
            <div className="border-b-2 border-[#F3BC62] w-60 my-2"></div>
            <div className="w-96">
              <p>Edit Slots</p>
              <input
                name="slots"
                type="number"
                value={newSchedule.slots}
                onChange={handleInputChange}
                placeholder="Enter number of slots"
                className="border w-full p-2 mb-2"
              />
              <p>Date</p>
              <input
                name="date"
                type="date"
                value={newSchedule.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="border w-full p-2 mb-2"
              />
              <p>Start Time</p>
              <input
                name="startTime"
                type="time"
                value={newSchedule.startTime}
                onChange={handleInputChange}
                placeholder="Start Time"
                className="border w-full p-2 mb-2"
              />
              <p>End Time</p>
              <input
                name="endTime"
                type="time"
                value={newSchedule.endTime}
                onChange={handleInputChange}
                placeholder="End Time"
                className="border w-full p-2 mb-2"
              />
            </div>
            <div className="flex justify-center gap-10 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl"
                onClick={() => {
                  const originalSchedule = schedules[editIndex];

                  // Determine the updated fields and only apply changes
                  const formattedSchedule = {
                    ...originalSchedule, // Keep all original values
                    slots:
                      newSchedule.slots !== originalSchedule.slots
                        ? newSchedule.slots
                        : originalSchedule.slots,
                    date:
                      newSchedule.date !== originalSchedule.date
                        ? formatDate(newSchedule.date)
                        : originalSchedule.date,
                    startTime:
                      newSchedule.startTime !== originalSchedule.startTime
                        ? formatTime(newSchedule.startTime)
                        : originalSchedule.startTime,
                    endTime:
                      newSchedule.endTime !== originalSchedule.endTime
                        ? formatTime(newSchedule.endTime)
                        : originalSchedule.endTime,
                  };

                  // Check if any field has been changed
                  const isUnchanged =
                    formattedSchedule.slots === originalSchedule.slots &&
                    formattedSchedule.date === originalSchedule.date &&
                    formattedSchedule.startTime ===
                      originalSchedule.startTime &&
                    formattedSchedule.endTime === originalSchedule.endTime;

                  if (isUnchanged) {
                    alert("No changes made to the schedule.");
                    return; // Do not close the modal, allow user to continue editing
                  }

                  // Update the schedule in state
                  setSchedules((prevSchedules) =>
                    prevSchedules.map((schedule, index) =>
                      index === editIndex ? formattedSchedule : schedule
                    )
                  );

                  closeEditModal(); // Close the modal if there are changes
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-12 rounded-md shadow-md text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Schedule?
            </h2>
            <div className="flex justify-center mt-8 gap-8">
              <button
                className="bg-[#C9C9C9] text-[#161F55] px-8 py-1 rounded-[20px]"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-8 py-1 rounded-[20px]"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
    </div>
  );
};

export default Schedule;
