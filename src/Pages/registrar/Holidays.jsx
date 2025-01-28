import { IoMdArrowDropdown } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Sidebar from "/src/components/Sidebar";
import Footer from "/src/pages/registrar/components/Footer.jsx";
import Header from "/src/pages/registrar/components/Header.jsx";
import { useState } from "react";

const Holidays = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [newHoliday, setNewHoliday] = useState({
    no: "",
    date: "",
    description: "",
    actions: "",
  });
  const [holidays, setHolidays] = useState([
    {
      no: "1",
      date: "2025/01/01",
      description: "New Year's Day",
      actions: "",
    },
    {
      no: "2",
      date: "2025/03/31",
      description: "Eidul-Fitar",
      actions: "",
    },
    {
      no: "3",
      date: "2025/04/09",
      description: "The Day of Valor",
      actions: "",
    },
    {
      no: "4",
      date: "2025/05/01",
      description: "Labor Day",
      actions: "",
    },
    {
      no: "5",
      date: "2025/06/07",
      description: "Eid al-Adha (Feast of Sacrifice)",
      actions: "",
    },
    {
      no: "6",
      date: "2025/06/08",
      description: "Eid al-Adha Day 2",
      actions: "",
    },
    {
      no: "7",
      date: "2025/06/12",
      description: "Independence Day",
      actions: "",
    },
    {
      no: "8",
      date: "2025/08/21",
      description: "Ninoy Aquino Day",
      actions: "",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setNewHoliday({
      no: "",
      date: "",
      description: "",
      actions: "",
    });
    setIsAddModalOpen(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setNewHoliday(holidays[index]);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setNewHoliday({
      no: "",
      date: "",
      description: "",
      actions: "",
    });
    setIsEditModalOpen(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addHolidays = () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = formatDate(newHoliday.date);
    const newNo = holidays.length + 1;

    setHolidays((prev) => [
      ...prev,
      { ...newHoliday, no: newNo.toString(), date: formattedDate },
    ]);

    closeAddModal();
  };

  const updateHolidays = () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = formatDate(newHoliday.date);
    const updatedHolidays = holidays.map((holiday, index) =>
      index === editIndex
        ? { ...holiday, ...newHoliday, date: formattedDate }
        : holiday
    );

    setHolidays(updatedHolidays);
    closeEditModal();
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setHolidays((prevHolidays) => {
      const updatedHolidays = prevHolidays.filter((_, i) => i !== deleteIndex);
      return updatedHolidays.map((holiday, index) => ({
        ...holiday,
        no: (index + 1).toString(),
      }));
    });
    closeDeleteModal();
  };
  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && (
        <div>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto ">
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
            title="Holidays Record"
          />
          <section className="h-[1200px] z-10 bg-white max-w-[1100px] mx-auto p-5 my-5">
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
            <table
              className="text-[18px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-5">NO.</th>
                  <th className="border p-5">DATE</th>
                  <th className="border p-5">DESCRIPTION</th>
                  <th className="border p-5">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((holiday, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-gray-100" : ""
                    } text-center`}
                  >
                    <td className="border p-5">{holiday.no}</td>
                    <td className="border p-5">{holiday.date}</td>
                    <td className="border p-5">{holiday.description}</td>
                    <td className="border p-5">
                      <div className="flex gap-2 justify-center">
                        <div
                          className="bg-[#CF5824] p-2 rounded cursor-pointer hover:bg-orange-700"
                          onClick={() => openEditModal(rowIndex)}
                        >
                          <FaEdit className="text-white" />
                        </div>
                        <div
                          className="bg-[#6F6F6F] p-2 rounded cursor-pointer hover:bg-gray-700"
                          onClick={() => openDeleteModal(rowIndex)}
                        >
                          <BsTrash3 className="text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
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
            <h2 className="text-xl font-bold mb-4 uppercase">Add Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-60 my-2"></div>
            <div className="w-96">
              <p>DATE</p>
              <input
                name="date"
                type="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                placeholder="Enter number of slots"
                className="border w-full p-2 mb-2"
              />
              <p>DESCRIPTION</p>
              <input
                name="description"
                type="text"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border w-full p-2 mb-2"
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                className=" bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeAddModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#161f55] text-white px-8 py-2 rounded-2xl"
                onClick={addHolidays}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 uppercase">Update Holiday</h2>
            <div className="border-b-2 border-[#F3BC62] w-60 my-2"></div>
            <div className="w-96">
              <p>Date</p>
              <input
                name="date"
                type="date"
                value={newHoliday.date}
                onChange={handleInputChange}
                placeholder="yyyy/mm/dd"
                className="border w-full p-2 mb-2"
              />
              <p>Description</p>
              <input
                name="description"
                type="text"
                value={newHoliday.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border w-full p-2 mb-2"
              />
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button
                className="bg-gray-300 text-black px-8 py-2 rounded-2xl"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-8 py-2 rounded-2xl"
                onClick={updateHolidays}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-md shadow-md text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this Holiday?
            </h2>
            <div className="flex justify-between mt-6">
              <button
                className="bg-[#6F6F6F] text-white px-6 py-1 rounded-md hover:bg-gray-900"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-[#161F55] text-white px-6 py-1 rounded-md hover:bg-blue-800"
                onClick={confirmDelete}
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

export default Holidays;
