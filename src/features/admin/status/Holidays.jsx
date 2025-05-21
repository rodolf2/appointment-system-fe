import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Sidebar from "/src/components/Sidebar"; // Make sure this path is correct
import Header from "/src/features/admin/components/Header"; // Make sure this path is correct
import Footer from "/src/features/admin/components/Footer"; // Make sure this path is correct
import { Tooltip } from "react-tooltip";
import useHolidays from "./hooks/useHolidays"; // Adjust path if necessary
import { FaSearch } from "react-icons/fa";

const formatDateToYyyyMmDd = (dateString) => {
  if (!dateString || typeof dateString !== 'string') { // Added type check
    // console.warn("formatDateToYyyyMmDd: Invalid dateString input:", dateString);
    return ""; // Or "Invalid Date" or handle as preferred
  }
  // Assumes dateString is already in 'YYYY-MM-DD' format from the hook
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      // Basic validation for parts
      if (year.length === 4 && month.length === 2 && day.length === 2 && !isNaN(parseInt(year)) && !isNaN(parseInt(month)) && !isNaN(parseInt(day))) {
        return `${year}/${month}/${day}`;
      }
    }
    // Fallback or if direct parsing from YYYY-MM-DD fails or isn't what's coming
    const dateObj = new Date(dateString.includes('T') ? dateString : dateString + 'T00:00:00');
    if (isNaN(dateObj.getTime())) {
      // console.warn("formatDateToYyyyMmDd: Could not parse dateString:", dateString);
      return "Invalid Date";
    }
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  } catch (e) {
    console.error("Error formatting date:", e, "Input:", dateString);
    return "Invalid Date";
  }
};
const Holidays = () => {
  const {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newHoliday,
    holidays,
    toggleSidebar,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    addHolidays,
    updateHolidays,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useHolidays();

  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="flex-1 overflow-y-auto ">
        <main className="h-auto">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Holidays Record"
          />
          <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5"> {/* Adjusted min-height */}
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2">
              <div className="text-[#161F55] flex justify-between px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF HOLIDAYS
                  <div className="border-b-4 border-[#F3BC62] w-[330px] my-3"></div>
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
                    id="show"
                    name="show"
                    type="number"
                    min="1"
                    max="10" // This is for display, actual data length depends on API
                    defaultValue="10" // Show more by default
                    className="text-center always-show-spinner w-16" // Added w-16
                  />
                  <span className="ml-2">ENTRIES</span>
                </div>
                <div className="relative">
                  <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="search"
                    type="search"
                    className="border-[#989898] py-2 bg-white text-[#161F55] mr-5 pl-8"
                    placeholder="Search"
                  // Add onChange handler for search functionality later
                  />
                </div>
              </div>
            </div>
            <table
              className="text-[18px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-5 w-[10%]">NO.</th> {/* Added w- for column width */}
                  <th className="border p-5 w-[25%]">DATE</th>
                  <th className="border p-5 w-[45%]">DESCRIPTION</th>
                  <th className="border p-5 w-[20%]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {holidays.length > 0 ? (
                  holidays.map((holiday, rowIndex) => (
                    <tr
                      key={holiday.id} // Use unique holiday.id (which is _id from MongoDB)
                      className={`${rowIndex % 2 === 0 ? "bg-gray-100" : ""
                        } text-center`}
                    >
                      <td className="border p-5">{rowIndex + 1}</td> {/* Display number */}
                      <td className="border p-5">{formatDateToYyyyMmDd(holiday.date)}</td>
                      <td className="border p-5 text-center">{holiday.description}</td>
                      <td className="border p-5">
                        <div className="flex gap-2 justify-center">
                          <div
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit"
                            className="bg-[#CF5824] p-2 rounded cursor-pointer hover:bg-orange-700"
                            onClick={() => openEditModal(holiday)} // Pass the whole holiday object
                          >
                            <FaEdit className="text-white" />
                          </div>
                          <div
                            data-tooltip-id="delete-tooltip"
                            data-tooltip-content="Delete"
                            className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                            onClick={() => openDeleteModal(holiday.id)} // Pass holiday.id
                          >
                            <BsTrash3 className="text-white" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-10">No holidays found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
              <span className="text-[#161F55]">
                {/* Update this based on actual pagination logic if implemented */}
                SHOWING 1 TO {holidays.length} OF {holidays.length} ENTRIES
              </span>
              <div className="mr-6">
                {/* Basic pagination, can be expanded */}
                <button className="border p-1 text-[#161F55]" disabled>Previous</button>
                <button className="border bg-[#161F55] text-[#D9D9D9] w-[40px] h-[35px]">
                  1
                </button>
                <button className="border p-1 text-[#161F55]" disabled>Next</button>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-10 sm:p-20 rounded-xl shadow-md w-11/12 max-w-lg"> {/* Responsive width */}
            <h2 className="text-xl font-bold mb-4 uppercase">Add Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-full max-w-xs my-2"></div> {/* Responsive width */}
            <div className="w-full">
              <label htmlFor="add-date" className="block mb-1">DATE</label>
              <input
                id="add-date"
                name="date"
                type="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                className="border w-full p-2 mb-2"
              />
              <label htmlFor="add-description" className="block mb-1">DESCRIPTION</label>
              <input
                id="add-description"
                name="description"
                type="text"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border w-full p-2 mb-4"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                className=" bg-gray-300 text-black px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={addHolidays}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-10 sm:p-20 rounded-xl shadow-md w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4 uppercase">Update Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-full max-w-xs my-2"></div>
            <div className="w-full">
              <label htmlFor="edit-date" className="block mb-1">Date</label>
              <input
                id="edit-date"
                name="date"
                type="date"
                value={newHoliday.date} // This is pre-filled by openEditModal
                onChange={handleInputChange}
                className="border w-full p-2 mb-2"
              />
              <label htmlFor="edit-description" className="block mb-1">Description</label>
              <input
                id="edit-description"
                name="description"
                type="text"
                value={newHoliday.description} // This is pre-filled
                onChange={handleInputChange}
                placeholder="Description"
                className="border w-full p-2 mb-4"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl w-full sm:w-auto"
                onClick={updateHolidays}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-70 z-50">
          <div className="bg-white p-10 rounded-md shadow-md text-center w-11/12 max-w-md">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Holiday?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-10">
              <button
                className="bg-[#C9C9C9] text-[#161F55] px-6 py-1 rounded-[20px] w-full sm:w-auto"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-6 py-1  rounded-[20px] w-full sm:w-auto"
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

export default Holidays;