import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFeedback from "./hooks/useFeedback";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const feedbackData = [
  {
    initials: "AB",
    name: "Ashley Buenavista",
    feedback: [
      "Is easy to use",
      "Has the features I want",
      "Feels fast and responsive",
      "Is reliable",
    ],
    rating: 5,
    color: "bg-green-500",
  },
  {
    initials: "KL",
    name: "Kahlea Ligaya",
    feedback: [
      "Is easy to use",
      "Has the features I want",
      "Feels fast and responsive",
      "Is reliable",
    ],
    rating: 5,
    color: "bg-blue-500",
  },
  {
    initials: "TF",
    name: "Teodore Florenciano",
    feedback: [
      "Is easy to use",
      "Has the features I want",
      "Feels fast and responsive",
      "Is reliable",
    ],
    rating: 3,
    color: "bg-red-500",
  },
  {
    initials: "TF",
    name: "Teodore Florenciano",
    feedback: [
      "Is easy to use",
      "Has the features I want",
      "Feels fast and responsive",
      "Is reliable",
    ],
    rating: 3,
    color: "bg-red-500",
  },
  {
    initials: "TF",
    name: "Teodore Florenciano",
    feedback: [
      "Is easy to use",
      "Has the features I want",
      "Feels fast and responsive",
      "Is reliable",
    ],
    rating: 3,
    color: "bg-red-500",
  },
];

const Feedback = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
    currentPage,
    totalEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSortChange,
    sortOrder,
    currentFeedback,
  } = useFeedback();

  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`sidebar-container ${isSidebarOpen ? "w-[300px]" : "w-[100px]"} z-20`}>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url("/assets/image/BackGround.png")` }}>
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
      </div>
      <div className="flex-1 overflow-y-auto z-10 relative">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="User Feedback"
        />
        <main className="min-h-[calc(100vh-160px)]">
          <section className="max-w-[1300px] mx-auto p-5 my-5">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-LatoRegular tracking-[5px] text-[#000]">
                User Feedback
              </h2>
              <div className="border-b-4 border-[#F3BC62] w-[260px] my-3"></div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-LatoRegular text-[#000]">Sort by:</label>
                  <select 
                    id="sort" 
                    className="text-sm font-LatoRegular text-[#000] border border-[#000] rounded-sm"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="border px-3 py-1 text-[#161F55] rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`border-t border-b px-3 py-1 ${
                        currentPage === number
                          ? "bg-[#161F55] text-white"
                          : "text-[#161F55] hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === calculatedTotalPages}
                    className="border px-3 py-1 text-[#161F55] rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Cards Section */}
            <div className="mt-8 bg-white rounded-lg shadow-lg">
              <div className="p-8">
                {currentFeedback.map((fb, idx) => (
                  <div
                    key={fb.name}
                    className={`flex items-center border ${idx === 1 ? "border-blue-500" : "border-gray-200"} rounded-xl p-4 mb-6 relative bg-white`}
                  >
                    {/* User Initials */}
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-bold ${fb.color}`}>{fb.initials}</div>
                    {/* User Name & Feedback */}
                    <div className="ml-6 flex-1">
                      <div className="font-semibold text-lg text-[#1A2341]">{fb.name}</div>
                      <ul className="text-gray-700 text-sm mt-1 list-none flex flex-col gap-2">
                        {fb.feedback.map((item, i) => (
                          <li key={i} className="flex items-center justify-between">
                            <span>{item.category}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Divider */}
                    <div className="mx-6 h-20 w-[6px] bg-[#007AFF] opacity-30"></div>
                    {/* Stars */}
                    <div className="flex flex-col gap-2">
                      {fb.feedback.map((item, i) => (
                        <div key={i} className="flex items-center gap-1">
                          {[...Array(5)].map((_, starIndex) => (
                            <FaStar 
                              key={starIndex}
                              className={`text-sm ${starIndex < item.rating ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Info */}
              <div className="flex justify-end items-center p-4 border-t">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 text-white bg-[#161F55] hover:bg-blue-500 rounded-full disabled:cursor-not-allowed"
                  >
                    <IoIosArrowBack className="text-2xl" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === calculatedTotalPages}
                    className="p-2 text-white bg-[#161F55] hover:bg-blue-500 rounded-full disabled:cursor-not-allowed"
                  >
                    <IoIosArrowForward className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Feedback;
