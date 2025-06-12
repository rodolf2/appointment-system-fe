import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import useStudents from "./hooks/useStudents";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Students = () => {
  const API_URL = `${
    import.meta.env.VITE_API_URL
  }/api/document-requests/docs-with-details`;

  const {
    // Data states
    loading,
    error,

    // Pagination states
    currentPage,
    entriesPerPage,
    totalFilteredEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,

    // Filtered data
    filteredAppointments,

    // Handlers
    handleSearchChange,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,

    // Search state
    searchTerm,

    // Sidebar states and handlers
    isSidebarOpen,
    toggleSidebar,
  } = useStudents(API_URL);

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
            title="Students/Alumni's Records Request"
          />
          <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5">
            <div className="bg-[#D9D9D9] h-52 m-4 pt-2 rounded-md">
              <div className="text-[#161F55] px-3 pt-2 ml-3">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF STUDENTS/ALUMNI'S RECORDS REQUEST
                  <div className="border-b-4 border-[#F3BC62] w-[900px] my-3"></div>
                </h2>
              </div>

              <div className="flex justify-between items-center mt-16 ml-4 mr-5">
                <div className="text-[#161F55] font-semibold text-[18px] flex items-center">
                  <label htmlFor="show-entries" className="mr-2">
                    SHOW
                  </label>
                  <select
                    id="show-entries"
                    name="show-entries"
                    value={entriesPerPage}
                    onChange={handleEntriesPerPageChange}
                    className="text-center w-20 p-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#161F55]"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                  </select>
                  <span className="ml-2">ENTRIES</span>
                </div>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-[#989898] py-2 bg-white text-[#161F55] pl-10 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#161F55]"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>

            <table
              className="text-[15px] w-[97%] border-collapse text-[#161F55] mt-8 mx-auto"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border p-5 w-[10%]">TRANSACTION NO.</th>
                  <th className="border p-5 w-[14%]">NAME</th>
                  <th className="border p-5 w-[9%]">LAST S.Y. ATTENDED</th>
                  <th className="border p-5 w-[9%]">
                    PROGRAM/ <br />
                    GRADE/
                    <br />
                    STRAND
                  </th>
                  <th className="border p-5 w-[9%]">CONTACT NO.</th>
                  <th className="border p-5 w-[14%]">EMAIL ADDRESS</th>
                  <th className="border p-5 w-[10%]">ATTACHMENT PROOF</th>
                  <th className="border p-5 w-[9%]">PURPOSE</th>
                  <th className="border p-5 w-[9%]">REQUEST</th>
                  <th className="border p-5 w-[10%]">DATE OF REQUEST</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="10" className="text-center p-5">
                      Loading student records...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="10" className="text-center p-5 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center p-5">
                      {searchTerm
                        ? "No matching records found."
                        : "No student records found."}
                    </td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  filteredAppointments
                    .slice(
                      (currentPage - 1) * entriesPerPage,
                      currentPage * entriesPerPage
                    )
                    .map((data, index) => (
                      <tr
                        key={data.transactionNumber || index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        } text-center`}
                      >
                        <td className="border p-5 text-[#354CCE] font-bold break-words">
                          {data.transactionNumber}
                        </td>
                        <td className="border p-5 break-words">{data.name}</td>
                        <td className="border p-5 break-words">
                          {data.lastSY}
                        </td>
                        <td className="border p-5 break-words">
                          {data.program}
                        </td>
                        <td className="border p-5 break-words">
                          {data.contact}
                        </td>
                        <td className="border p-5 break-words">
                          <span
                            data-tooltip-id="email-tooltip"
                            data-tooltip-content={data.email}
                            className="cursor-help"
                            title={data.email}
                          >
                            {data.email.length > 20
                              ? `${data.email.substring(0, 20)}...`
                              : data.email}
                          </span>
                        </td>{" "}
                        <td className="border p-5 break-words">
                          {data.attachment &&
                          data.attachment !== "No attachments" ? (
                            <div className="flex flex-col gap-1">
                              {" "}
                              {data.attachment.split(", ").map((url, index) => {
                                // Extract original filename from the Cloudinary URL
                                const urlParts = url.split("/");
                                const lastPart = urlParts[urlParts.length - 1];
                                // Get the original filename by removing timestamp and random numbers
                                const filename =
                                  lastPart.replace(
                                    /^attachment-([^-]+)-\d+-\d+/,
                                    "$1"
                                  ) || `Attachment ${index + 1}`;
                                // Ensure the URL has the complete Cloudinary path with transformations
                                let viewableUrl;
                                if (
                                  url.startsWith("https://res.cloudinary.com")
                                ) {
                                  viewableUrl = url;
                                } else {
                                  // Remove any leading slashes
                                  const cleanPath = url.replace(/^\/+/, "");
                                  // Add Cloudinary transformations for optimal viewing
                                  viewableUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/c_scale,w_800/${cleanPath}`;
                                }

                                return (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <a
                                      href={viewableUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline text-sm break-words flex-1"
                                      title="Click to view full size"
                                    >
                                      {filename}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm">
                              No attachments
                            </span>
                          )}
                        </td>
                        <td className="border p-5 break-words">
                          {data.purpose}
                        </td>
                        <td className="border p-5 break-words">
                          {data.request}
                        </td>
                        <td className="border p-5 break-words">
                          {new Date(data.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {calculatedTotalPages > 0 && (
              <div className="flex justify-between items-center mt-10 text-[18px] px-4 mx-auto w-[97%]">
                <span className="text-[#161F55]">
                  SHOWING {startEntry} TO {endEntry} OF {totalFilteredEntries}{" "}
                  ENTRIES
                </span>
                {calculatedTotalPages > 1 && (
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
                )}
              </div>
            )}
          </section>
          <Footer />
        </main>
      </div>

      {/* Tooltips */}
      <Tooltip id="email-tooltip" />
    </div>
  );
};

export default Students;
