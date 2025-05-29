import React from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFeedback from "./hooks/useFeedback";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    loading,
    error
  } = useFeedback();

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Function to get random color for initials
  const getRandomColor = (name) => {
    const colors = [
      'bg-green-500',
      'bg-blue-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`sidebar-container ${isSidebarOpen ? "w-[300px]" : "w-[100px]"} z-20`}>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url("/assets/image/BackGround.png")` }}>
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
      </div>
      <div className="flex-1 overflow-y-auto z-10 relative flex flex-col min-h-screen">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="User Feedback"
        />
        <main className="flex-1">
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
            <div className="mt-8 bg-white rounded-lg shadow-lg flex-1">
              <div className="p-8 min-h-[400px] flex flex-col">
                {loading ? (
                  <div className="text-center py-4 flex-1 flex items-center justify-center">Loading feedback...</div>
                ) : error ? (
                  <div className="text-center py-4 text-red-500 flex-1 flex items-center justify-center">{error}</div>
                ) : currentFeedback.length === 0 ? (
                  <div className="text-center py-4 flex-1 flex items-center justify-center">No feedback available</div>
                ) : (
                  <div className="flex-1">
                    {currentFeedback.map((fb, idx) => (
                      <div
                        key={fb._id}
                        className={`flex items-center border ${idx === 1 ? "border-blue-500" : "border-gray-200"} rounded-xl p-4 mb-6 relative bg-white`}
                      >
                        {/* User Initials */}
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-bold ${getRandomColor(fb.name)}`}>
                          {getInitials(fb.name)}
                        </div>
                        {/* User Name & Feedback */}
                        <div className="ml-6 flex-1">
                          <div className="font-semibold text-lg text-[#1A2341]">{fb.name}</div>
                          <ul className="text-gray-700 text-sm mt-1 list-none flex flex-col gap-2">
                            {Object.entries(fb.ratings).map(([category, rating]) => (
                              <li key={category} className="flex items-center justify-between">
                                <span className="capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Divider */}
                        <div className="mx-6 h-20 w-[2px] bg-[#161F55] opacity-30"></div>
                        {/* Stars */}
                        <div className="flex flex-col gap-2">
                          {Object.entries(fb.ratings).map(([category, rating]) => (
                            <div key={category} className="flex items-center gap-1">
                              {[...Array(5)].map((_, starIndex) => (
                                <FaStar 
                                  key={starIndex}
                                  className={`text-sm ${starIndex < rating ? "text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Feedback;
