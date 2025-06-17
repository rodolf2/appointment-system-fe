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

  // Custom CSS for tooltips
  const tooltipStyle = `
  /* The parent element (now the <td>) needs to be the positioning context */
  [data-tooltip] {
    position: relative;
  }

  /* The cursor should only change to a pointer if a tooltip exists */
  [data-tooltip][data-tooltip]:hover {
    cursor: pointer;
  }

  [data-tooltip]::before {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: pre-line;
    max-width: 300px;
    width: max-content;
    z-index: 1000;

    /* Initially hidden and non-interactive */
    opacity: 0;
    pointer-events: none;

    /* Positioning - show below the element */
    top: 105%;
    left: 50%;
    transform: translateX(-50%);

    /* Smooth transition */
    transition: opacity 0.2s ease-in-out;
  }

  /* Show on hover */
  [data-tooltip]:hover::before {
    opacity: 1;
  }
`;

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
      <style>{tooltipStyle}</style>

      <div
        className={`${
          isSidebarOpen ? "w-[300px]" : "w-[100px]"
        }transition-all duration-300 z-20`}
      >
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
                  <th className="border p-5 w-[12%]">TRANSACTION NO.</th>
                  <th className="border p-5 w-[15%]">NAME</th>
                  <th className="border p-5 w-[10%]">LAST S.Y. ATTENDED</th>
                  <th className="border p-5 w-[12%]">
                    PROGRAM/GRADE/
                    <br />
                    STRAND
                  </th>
                  <th className="border p-5 w-[10%]">CONTACT NO.</th>
                  <th className="border p-5 w-[15%]">EMAIL ADDRESS</th>
                  <th className="border p-5 w-[10%]">ATTACHMENT PROOF</th>
                  <th className="border p-5 w-[10%]">PURPOSE</th>
                  <th className="border p-5 w-[10%]">REQUEST</th>
                  <th className="border p-5 w-[10%]">DATE OF REQUEST</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="11" className="text-center p-5">
                      Loading student records...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="11" className="text-center p-5 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan="11" className="text-center p-5">
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
                        <td className="border p-5">
                          <div className="max-w-[150px]">
                            <span
                              data-tooltip-id="email-tooltip"
                              data-tooltip-content={data.email}
                              className="cursor-help block truncate"
                            >
                              {data.email}
                            </span>
                          </div>
                        </td>
                        <td className="border p-5 break-words">
                          {data.attachment &&
                          data.attachment !== "No attachments" ? (
                            <div className="flex flex-col gap-2">
                              {data.attachment.split(", ").map((url, index) => {
                                console.log(
                                  "🔍 DEBUG: Processing attachment URL:",
                                  {
                                    originalUrl: url,
                                    isCloudinaryUrl: url.startsWith(
                                      "https://res.cloudinary.com"
                                    ),
                                    urlLength: url.length,
                                    studentData: data.transactionNumber,
                                  }
                                );

                                // Extract original filename from the Cloudinary URL
                                const urlParts = url.split("/");
                                const lastPart = urlParts[urlParts.length - 1];

                                // Extract filename from the public_id format: originalname-studentId-timestamp
                                let filename = lastPart;

                                // Try to extract original filename from the pattern
                                const publicIdMatch = lastPart.match(
                                  /^(.+)-[^-]+-\d+(\.[^.]+)?$/
                                );
                                if (publicIdMatch) {
                                  // Replace underscores back to spaces and get original name
                                  filename = publicIdMatch[1].replace(
                                    /_/g,
                                    " "
                                  );
                                  // Add extension if it exists
                                  if (publicIdMatch[2]) {
                                    filename += publicIdMatch[2];
                                  } else {
                                    // Default to .jpg if no extension found
                                    filename += ".jpg";
                                  }
                                } else {
                                  // Fallback to generic name
                                  filename = `Attachment ${index + 1}`;
                                }

                                // Ensure the URL has the complete Cloudinary path with transformations
                                let viewableUrl;
                                let thumbnailUrl;

                                if (
                                  url.startsWith("https://res.cloudinary.com")
                                ) {
                                  // URL is already complete
                                  viewableUrl = url;
                                  // Create thumbnail by adding transformation
                                  thumbnailUrl = url.replace(
                                    "/upload/",
                                    "/upload/c_thumb,w_50,h_50,g_face/"
                                  );
                                } else {
                                  // Simple fix: Use the exact pattern from your database
                                  const filename = url
                                    .replace(/\.[^/.]+$/, "")
                                    .replace(/[^a-zA-Z0-9]/g, "_");

                                  // Try multiple timestamps that might work
                                  const possibleTimestamps = [
                                    "1750090241090", // From your database example
                                    "1749976559176", // From previous examples
                                    Date.now().toString(), // Current timestamp as fallback
                                  ];

                                  // Use the first timestamp for now
                                  const timestamp = possibleTimestamps[0];
                                  const versionTimestamp = timestamp.substring(
                                    0,
                                    10
                                  ); // First 10 digits for version

                                  viewableUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/v${versionTimestamp}/appointment-system/attachments/${filename}-undefined-${timestamp}`;
                                  thumbnailUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/c_thumb,w_50,h_50,g_face/v${versionTimestamp}/appointment-system/attachments/${filename}-undefined-${timestamp}`;

                                  console.log("Constructed URLs:", {
                                    viewableUrl,
                                    thumbnailUrl,
                                  });
                                }

                                console.log("Processed URLs:", {
                                  viewableUrl,
                                  thumbnailUrl,
                                  filename,
                                });

                                return (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2 group"
                                  >
                                    {/* Thumbnail preview */}
                                    <img
                                      src={thumbnailUrl}
                                      alt="Attachment thumbnail"
                                      className="w-8 h-8 object-cover rounded border cursor-pointer hover:scale-110 transition-transform"
                                      onClick={() =>
                                        window.open(viewableUrl, "_blank")
                                      }
                                      onError={(e) => {
                                        // Try alternative URLs if the first one fails
                                        const originalName = url
                                          .replace(/\.[^/.]+$/, "")
                                          .replace(/[^a-zA-Z0-9]/g, "_");
                                        // Try different timestamps for other images
                                        const possibleTimestamps = [
                                          "1749976559176", // Previous example
                                          "1750090000000", // Approximate timestamp
                                          "1749900000000", // Earlier timestamp
                                          "1750000000000", // Another possibility
                                          "1750100000000", // Later timestamp
                                        ];

                                        const alternatives =
                                          possibleTimestamps.map(
                                            (timestamp) => {
                                              const versionTimestamp =
                                                timestamp.substring(0, 10);
                                              return `https://res.cloudinary.com/dp9hjzio8/image/upload/c_thumb,w_50,h_50,g_face/v${versionTimestamp}/appointment-system/attachments/${originalName}-undefined-${timestamp}`;
                                            }
                                          );

                                        let currentIndex = parseInt(
                                          e.target.dataset.attemptIndex || "0"
                                        );
                                        if (
                                          currentIndex < alternatives.length
                                        ) {
                                          console.log(
                                            `Trying alternative URL ${
                                              currentIndex + 1
                                            }:`,
                                            alternatives[currentIndex]
                                          );
                                          e.target.src =
                                            alternatives[currentIndex];
                                          e.target.dataset.attemptIndex = (
                                            currentIndex + 1
                                          ).toString();
                                        } else {
                                          console.log(
                                            "All alternative URLs failed, hiding image"
                                          );
                                          e.target.style.display = "none";
                                        }
                                      }}
                                    />

                                    {/* Filename with truncation */}
                                    <div className="flex-1 min-w-0">
                                      <a
                                        href={viewableUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm block"
                                        title={filename}
                                      >
                                        <span
                                          data-tooltip-id="attachment-tooltip"
                                          data-tooltip-content={filename}
                                          className="cursor-help block truncate max-w-[120px]"
                                        >
                                          {filename}
                                        </span>
                                      </a>
                                    </div>
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
                          <span
                            data-tooltip-id="purpose-tooltip"
                            data-tooltip-content={
                              data.purpose.length > 50
                                ? data.purpose.replace(/(.{50})/g, "$1\n")
                                : data.purpose
                            }
                            className="cursor-help"
                          >
                            {data.purpose.length > 20
                              ? `${data.purpose.substring(0, 20)}...`
                              : data.purpose}
                          </span>
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
      <Tooltip id="purpose-tooltip" style={{ whiteSpace: "pre-line" }} />
      <Tooltip id="attachment-tooltip" />
    </div>
  );
};

export default Students;
