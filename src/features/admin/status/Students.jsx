import Sidebar from "../../../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useStudents from "./hooks/useStudents";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { AdminSkeleton } from "../../../components/skeleton/AdminSkeleton";

const Students = () => {
  // State for tracking image loading errors
  const [imgErrors, setImgErrors] = useState({});

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

  // State for storing actual attachment URLs
  const [attachmentUrls, setAttachmentUrls] = useState({});
  const [attachmentLoading, setAttachmentLoading] = useState(false);

  // Fetch actual attachment URLs from the backend
  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      if (!filteredAppointments || filteredAppointments.length === 0) return;

      setAttachmentLoading(true);
      try {
        const ATTACHMENT_API_URL = `${
          import.meta.env.VITE_API_URL
        }/api/attachment`;
        const response = await fetch(ATTACHMENT_API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch attachments");
        }

        const result = await response.json();
        console.log("🔍 Fetched attachment data:", result);

        // Create a mapping of student ID to attachment URLs
        const urlMapping = {};
        const studentIdToTransactionMapping = {};

        // First, create a mapping from student ObjectId to transaction number
        if (filteredAppointments && Array.isArray(filteredAppointments)) {
          filteredAppointments.forEach((appointment) => {
            // We need to find a way to map student ObjectId to transaction number
            // For now, we'll use transaction number as the key
            studentIdToTransactionMapping[appointment.transactionNumber] =
              appointment.transactionNumber;
          });
        }

        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((attachment) => {
            if (attachment.files && Array.isArray(attachment.files)) {
              attachment.files.forEach((file) => {
                if (file.student && file.path) {
                  const studentObjectId = file.student._id || file.student;

                  // Try to find the transaction number for this student
                  // Since we don't have a direct mapping, we'll store by ObjectId for now
                  // and also try to match by transaction number if available
                  if (!urlMapping[studentObjectId]) {
                    urlMapping[studentObjectId] = [];
                  }
                  urlMapping[studentObjectId].push({
                    filename: file.filename,
                    url: file.path, // This is the actual Cloudinary URL!
                    mimetype: file.mimetype,
                    size: file.size,
                    studentObjectId: studentObjectId,
                  });
                }
              });
            }
          });
        }

        console.log("🔗 Created URL mapping:", urlMapping);
        setAttachmentUrls(urlMapping);
      } catch (error) {
        console.error("❌ Error fetching attachment URLs:", error);
      } finally {
        setAttachmentLoading(false);
      }
    };

    fetchAttachmentUrls();
  }, [filteredAppointments]);

  if (loading) {
    return (
      <div className="flex h-screen font-LatoRegular">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Header />
          <div>
            <section className="min-h-[calc(100vh-160px)] z-10 bg-white p-5 my-5">
              {/* Header Section */}
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className="text-[#161F55] px-3 ml-3 pt-2">
                  <div className="h-10 w-[450px] bg-gray-300 rounded animate-pulse mt-2"></div>
                  <div className="border-b-4 border-[#F3BC62] w-[450px] my-3"></div>
                </div>

                {/* Controls Section */}
                <div className="flex justify-between items-center mt-[78px] ml-4 mr-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-10 w-20 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="overflow-y-auto m-4 mt-8">
                <table
                  className="text-[15px] w-full"
                  style={{ tableLayout: "fixed" }}
                >
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-4 w-[12%]">TRANSACTION NO.</th>
                      <th className="border p-4 w-[15%]">NAME</th>
                      <th className="border p-4 w-[10%]">LAST S.Y. ATTENDED</th>
                      <th className="border p-4 w-[12%]">
                        PROGRAM/GRADE
                        <br />
                        STRAND
                      </th>
                      <th className="border p-4 w-[10%]">CONTACT NO.</th>
                      <th className="border p-4 w-[15%]">EMAIL ADDRESS</th>
                      <th className="border p-4 w-[10%]">ATTACHMENT PROOF</th>
                      <th className="border p-4 w-[10%]">PURPOSE</th>
                      <th className="border p-4 w-[10%]">REQUEST</th>
                      <th className="border p-4 w-[10%]">DATE OF REQUEST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse mx-auto w-28"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse mx-auto w-32"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-8 w-8 bg-gray-300 rounded animate-pulse mx-auto"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                          <td className="border p-4">
                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Section */}
              <div className="flex justify-between items-center mt-10 text-[18px] px-4">
                <div className="h-6 w-64 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

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
                  {" "}
                  LIST OF STUDENTS/ALUMNI RECORDS REQUEST
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
                              {(() => {
                                // First, try to get actual URLs from the fetched attachment data
                                // We need to find attachments by matching student data
                                let studentAttachments = [];

                                // Try to find attachments by looking through all attachment data
                                Object.values(attachmentUrls).forEach(
                                  (attachmentList) => {
                                    if (Array.isArray(attachmentList)) {
                                      attachmentList.forEach((attachment) => {
                                        // We'll match by checking if the attachment filename appears in the data.attachment string
                                        if (
                                          data.attachment &&
                                          data.attachment.includes(
                                            attachment.filename
                                          )
                                        ) {
                                          studentAttachments.push(attachment);
                                        }
                                      });
                                    }
                                  }
                                );

                                if (studentAttachments.length > 0) {
                                  console.log(
                                    "✅ Using actual attachment URLs for student:",
                                    data.transactionNumber,
                                    studentAttachments
                                  );

                                  return studentAttachments.map(
                                    (attachment, index) => {
                                      const viewableUrl = attachment.url;
                                      const thumbnailUrl =
                                        attachment.url.replace(
                                          "/upload/",
                                          "/upload/c_thumb,w_60,h_60,g_face/"
                                        );
                                      const filename = attachment.filename;

                                      console.log(
                                        "🔗 Using real Cloudinary URL:",
                                        {
                                          filename: filename,
                                          viewableUrl: viewableUrl,
                                          thumbnailUrl: thumbnailUrl,
                                          studentId: data.transactionNumber,
                                        }
                                      );

                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center space-x-2 group"
                                        >
                                          {" "}
                                          {!imgErrors[
                                            `${data.transactionNumber}-${index}`
                                          ] ? (
                                            <img
                                              src={thumbnailUrl}
                                              alt="Attachment thumbnail"
                                              className="w-8 h-8 object-cover rounded border cursor-pointer hover:scale-110 transition-transform"
                                              onClick={() =>
                                                window.open(
                                                  viewableUrl,
                                                  "_blank"
                                                )
                                              }
                                              onError={(e) => {
                                                // Try fallback URLs first
                                                const fallbacks =
                                                  window.cloudinaryFallbacks;
                                                if (fallbacks) {
                                                  console.log(
                                                    "🔄 Trying fallback URLs..."
                                                  );
                                                  e.target.src =
                                                    fallbacks.thumbnail;
                                                  // Update the onClick handler to use fallback viewable URL
                                                  e.target.onclick = () =>
                                                    window.open(
                                                      fallbacks.viewable,
                                                      "_blank"
                                                    );
                                                  return;
                                                }

                                                console.log(
                                                  "❌ Image failed to load:",
                                                  thumbnailUrl
                                                );
                                                setImgErrors((prev) => ({
                                                  ...prev,
                                                  [`${data.transactionNumber}-${index}`]: true,
                                                }));
                                              }}
                                            />
                                          ) : (
                                            <div
                                              className="w-8 h-8 bg-gray-300 rounded border flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors"
                                              onClick={() =>
                                                window.open(
                                                  viewableUrl,
                                                  "_blank"
                                                )
                                              }
                                            >
                                              <svg
                                                className="w-4 h-4 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                              </svg>
                                            </div>
                                          )}
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
                                    }
                                  );
                                } else {
                                  // Fallback to the old method if no real URLs found
                                  console.log(
                                    "⚠️ No real URLs found, falling back to reconstruction for:",
                                    data.transactionNumber
                                  );
                                  return data.attachment
                                    .split(", ")
                                    .map((url, index) => {
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
                                      const lastPart =
                                        urlParts[urlParts.length - 1];

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

                                      // Smart URL handling for Cloudinary attachments
                                      let viewableUrl;
                                      let thumbnailUrl;

                                      console.log(
                                        "🔍 Processing attachment URL:",
                                        {
                                          originalUrl: url,
                                          studentData: data.transactionNumber,
                                          studentName: data.name,
                                        }
                                      );

                                      if (
                                        url.startsWith(
                                          "https://res.cloudinary.com"
                                        )
                                      ) {
                                        // URL is already complete - use as-is
                                        viewableUrl = url;
                                        // Create thumbnail by adding transformation
                                        thumbnailUrl = url.replace(
                                          "/upload/",
                                          "/upload/c_thumb,w_60,h_60,g_face/"
                                        );
                                        console.log(
                                          "✅ Using complete Cloudinary URL:",
                                          {
                                            originalUrl: url,
                                            viewableUrl,
                                            thumbnailUrl,
                                            hasUndefined: url.includes(
                                              "undefined"
                                            )
                                              ? "❌ ORIGINAL HAS UNDEFINED!"
                                              : "✅ Original URL is clean",
                                          }
                                        );
                                      } else {
                                        // Handle filenames that need to be converted to Cloudinary URLs
                                        console.log(
                                          "🔧 Converting filename to Cloudinary URL:",
                                          url
                                        );

                                        // Since the backend stores only filenames but uploads to Cloudinary with pattern:
                                        // ${originalName}-${studentId}-${timestamp}
                                        // We need to try to find the actual uploaded file

                                        // Clean the original filename to match Cloudinary's sanitization
                                        const originalName = url
                                          .replace(/\.[^/.]+$/, "") // Remove extension
                                          .replace(/[^a-zA-Z0-9]/g, "_"); // Replace special chars with underscore

                                        // Get student ID from transaction number
                                        const studentId =
                                          data.transactionNumber || "unknown";

                                        console.log("🔧 Filename processing:", {
                                          originalUrl: url,
                                          cleanedName: originalName,
                                          studentId: studentId,
                                          note: "Backend uses studentId as-is (no sanitization)",
                                          expectedPattern: `${originalName}-${studentId}-{timestamp}`,
                                        });

                                        // Since we don't have the exact timestamp, we need to try multiple approaches:
                                        // 1. Try known working timestamps
                                        // 2. Use a more flexible URL construction that works with Cloudinary's delivery

                                        // Try to construct URLs with multiple timestamp strategies
                                        // Strategy 1: Use known working timestamps
                                        // Strategy 2: Try recent timestamps around current time
                                        // Strategy 3: Try timestamps from the past few days

                                        const currentTime = Date.now();
                                        const oneDayMs = 24 * 60 * 60 * 1000;

                                        const knownTimestamps = [
                                          "1750090241090", // Known working timestamp from logs
                                          "1749976559176", // Another known timestamp
                                          // Add some recent timestamps that might work
                                          currentTime.toString(),
                                          (currentTime - oneDayMs).toString(),
                                          (
                                            currentTime -
                                            2 * oneDayMs
                                          ).toString(),
                                          (
                                            currentTime -
                                            3 * oneDayMs
                                          ).toString(),
                                        ];

                                        // For the primary attempt, use the first known timestamp
                                        const primaryTimestamp =
                                          knownTimestamps[0];
                                        const versionTimestamp =
                                          primaryTimestamp.substring(0, 10);
                                        const publicId = `${originalName}-${studentId}-${primaryTimestamp}`;

                                        // Construct the URLs with version
                                        viewableUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/v${versionTimestamp}/appointment-system/attachments/${publicId}`;
                                        thumbnailUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/c_thumb,w_60,h_60,g_face/v${versionTimestamp}/appointment-system/attachments/${publicId}`;

                                        // Also create fallback URLs without version (more forgiving)
                                        const fallbackViewableUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/appointment-system/attachments/${publicId}`;
                                        const fallbackThumbnailUrl = `https://res.cloudinary.com/dp9hjzio8/image/upload/c_thumb,w_60,h_60,g_face/appointment-system/attachments/${publicId}`;

                                        // Store fallback URLs for error handling
                                        window.cloudinaryFallbacks = {
                                          viewable: fallbackViewableUrl,
                                          thumbnail: fallbackThumbnailUrl,
                                        };

                                        // Store alternative timestamps for error handling
                                        window.cloudinaryAlternatives =
                                          knownTimestamps.slice(1).concat([
                                            "1750000000000", // Round number fallbacks
                                            "1749900000000", // Earlier
                                            "1750100000000", // Later
                                            "1750200000000", // Even later
                                          ]);

                                        console.log("🔗 Constructed URLs:", {
                                          originalUrl: url,
                                          cleanedName: originalName,
                                          studentId: studentId,
                                          publicId: publicId,
                                          versionTimestamp: versionTimestamp,
                                          viewableUrl: viewableUrl,
                                          thumbnailUrl: thumbnailUrl,
                                          fallbackViewableUrl:
                                            window.cloudinaryFallbacks
                                              ?.viewable,
                                          fallbackThumbnailUrl:
                                            window.cloudinaryFallbacks
                                              ?.thumbnail,
                                          hasUndefined: viewableUrl.includes(
                                            "undefined"
                                          )
                                            ? "❌ STILL HAS UNDEFINED!"
                                            : "✅ No undefined found",
                                          publicIdBreakdown: {
                                            filename: originalName,
                                            studentId: studentId,
                                            timestamp: primaryTimestamp,
                                            fullPattern: `${originalName}-${studentId}-${primaryTimestamp}`,
                                            note: "If this fails, will try fallback URLs without version",
                                          },
                                          troubleshooting: {
                                            expectedCloudinaryPattern:
                                              "filename-studentId-timestamp",
                                            actualStudentId: studentId,
                                            containsHyphens: studentId.includes(
                                              "-"
                                            )
                                              ? "YES - This might cause issues"
                                              : "NO",
                                            backendSanitization:
                                              "Backend does NOT sanitize studentId",
                                          },
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
                                              console.log(
                                                "❌ Image failed to load, trying alternatives..."
                                              );

                                              // Try to construct alternative URLs using the same logic as above
                                              const originalName = url
                                                .replace(/\.[^/.]+$/, "")
                                                .replace(/[^a-zA-Z0-9]/g, "_");

                                              // Get student ID from context for better URL construction
                                              const studentId =
                                                data.transactionNumber ||
                                                "unknown";

                                              console.log(
                                                "🔄 Trying alternative URLs for:",
                                                {
                                                  originalUrl: url,
                                                  cleanedName: originalName,
                                                  studentId: studentId,
                                                }
                                              );

                                              // Try different timestamp patterns that might exist
                                              const currentTime = Date.now();
                                              const oneDayMs =
                                                24 * 60 * 60 * 1000;

                                              const possibleTimestamps = [
                                                "1750090241090", // Current example
                                                "1749976559176", // Previous example
                                                currentTime.toString(),
                                                (
                                                  currentTime - oneDayMs
                                                ).toString(),
                                                (
                                                  currentTime -
                                                  2 * oneDayMs
                                                ).toString(),
                                                (
                                                  currentTime -
                                                  3 * oneDayMs
                                                ).toString(),
                                                "1750090000000", // Approximate timestamp
                                                "1749900000000", // Earlier timestamp
                                                "1750000000000", // Another possibility
                                                "1750100000000", // Later timestamp
                                              ];

                                              const alternatives =
                                                possibleTimestamps.map(
                                                  (timestamp) => {
                                                    const versionTimestamp =
                                                      timestamp.substring(
                                                        0,
                                                        10
                                                      );
                                                    const publicId = `${originalName}-${studentId}-${timestamp}`;
                                                    return `https://res.cloudinary.com/dp9hjzio8/image/upload/c_thumb,w_60,h_60,g_face/v${versionTimestamp}/appointment-system/attachments/${publicId}`;
                                                  }
                                                );

                                              let currentIndex = parseInt(
                                                e.target.dataset.attemptIndex ||
                                                  "0"
                                              );

                                              if (
                                                currentIndex <
                                                alternatives.length
                                              ) {
                                                console.log(
                                                  `🔄 Trying alternative URL ${
                                                    currentIndex + 1
                                                  }:`,
                                                  alternatives[currentIndex]
                                                );
                                                e.target.src =
                                                  alternatives[currentIndex];
                                                e.target.dataset.attemptIndex =
                                                  (currentIndex + 1).toString();
                                              } else if (
                                                window.cloudinaryFallbacks &&
                                                !e.target.dataset.triedFallback
                                              ) {
                                                // Try fallback URLs without version
                                                console.log(
                                                  "🔄 Trying fallback URL without version:",
                                                  window.cloudinaryFallbacks
                                                    .thumbnail
                                                );
                                                e.target.src =
                                                  window.cloudinaryFallbacks.thumbnail;
                                                e.target.dataset.triedFallback =
                                                  "true";
                                              } else {
                                                console.log(
                                                  "❌ All alternative URLs failed, showing placeholder"
                                                );
                                                // Replace with a placeholder icon
                                                e.target.style.display = "none";
                                                const placeholder =
                                                  document.createElement("div");
                                                placeholder.className =
                                                  "w-8 h-8 bg-gray-300 rounded border flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors";
                                                placeholder.innerHTML = `
                                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                          `;
                                                placeholder.addEventListener(
                                                  "click",
                                                  () =>
                                                    window.open(
                                                      viewableUrl,
                                                      "_blank"
                                                    )
                                                );
                                                e.target.parentElement.appendChild(
                                                  placeholder
                                                );
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
                                    });
                                }
                              })()}
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
                        </td>{" "}
                        <td className="border p-5 break-words text-center">
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
