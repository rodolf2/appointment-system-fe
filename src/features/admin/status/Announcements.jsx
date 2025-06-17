import useAnnouncements from "./hooks/useAnnouncements";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";

const Announcements = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    announcement,
    postedAnnouncements,
    handleAnnouncementChange,
    handleAnnounce,
    handleDeleteAnnouncement,
    handleEditAnnouncement,
    showSuccessModal,
    closeSuccessModal,
    itemToDeleteId,
    confirmDelete,
    cancelDelete,
    showDeleteSuccessModal,
    closeDeleteSuccessModal,
    editingAnnouncement,
    closeEditModal,
    handleEditModalChange,
    handleUpdateAnnouncement,
    showUpdateSuccessModal,
    closeUpdateSuccessModal,
    validationErrors,
  } = useAnnouncements();

  const quillModules = {
    toolbar: [
      ["bold"],
      [{ list: "bullet" }, { list: "ordered" }],
      [{ align: [] }],
    ],
  };

  const handleQuillChange = (content) => {
    handleAnnouncementChange("description", content);
  };

  return (
    <div className="h-screen overflow-hidden flex font-LatoRegular relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url("/assets/image/BackGround.png")` }}
      >
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90" />
      </div>

      <aside
        className={`${
          isSidebarOpen ? "w-[300px]" : "w-[100px]"
        } transition-all duration-300 z-20 ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1 z-10 min-w-0">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Posting Announcement"
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 overflow-y-auto max-w-[1440px] w-full mx-auto">
          <section className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
            <h3 className="text-[20px] md:text-[24px] font-LatoSemiBold tracking-[1px] md:tracking-[2px] text-[#161F55]">
              Add New Announcement
            </h3>
            <div className="border-b-4 border-[#F3BC62] w-full max-w-[310px] my-2" />
          </section>

          <section className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 xl:grid-cols-[3fr,1fr] gap-4 md:gap-6 lg:gap-8">
              <div className="flex flex-col space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={announcement.title}
                    onChange={(e) =>
                      handleAnnouncementChange("title", e.target.value)
                    }
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      validationErrors.title
                        ? "border-red-500  focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  />
                  {validationErrors.title && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {validationErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <div
                    className={`${
                      validationErrors.description
                        ? "border border-red-500 rounded-lg "
                        : ""
                    }`}
                  >
                    <ReactQuill
                      theme="snow"
                      value={announcement.description}
                      onChange={handleQuillChange}
                      modules={quillModules}
                      placeholder="Description"
                      className="flex-grow flex flex-col [&_.ql-editor]:min-h-[200px] md:[&_.ql-editor]:min-h-[300px] lg:[&_.ql-editor]:min-h-[350px]"
                      style={{
                        minHeight:
                          window.innerWidth < 768
                            ? "250px"
                            : window.innerWidth < 1024
                            ? "320px"
                            : "380px",
                      }}
                    />
                  </div>
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {validationErrors.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-center md:justify-end items-center gap-4 pt-6 md:pt-10">
                  <button
                    onClick={handleAnnounce}
                    className="bg-[#161F55] text-white px-4 md:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base w-full md:w-auto"
                  >
                    Announce
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-3 md:p-4 bg-white flex flex-col mt-6 xl:mt-0">
                <h4 className="font-LatoSemiBold text-[16px] md:text-[18px] mb-3 text-[#161F55]">
                  Posted Announcements
                </h4>
                <div className="space-y-3 mt-2 flex-1 overflow-y-auto pr-2 max-h-[300px] md:max-h-[400px] xl:max-h-none">
                  {postedAnnouncements.length === 0 ? (
                    <div className="border rounded-lg p-3 text-sm text-gray-600">
                      No office transaction
                    </div>
                  ) : (
                    postedAnnouncements.map((post) => (
                      <div
                        key={post._id}
                        className="border rounded-lg p-2 md:p-3 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                          <h5 className="font-medium flex-1 break-words text-sm md:text-base">
                            {post.title}
                          </h5>

                          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 self-end sm:self-start">
                            <button
                              onClick={() => handleEditAnnouncement(post)}
                              className="p-1.5 md:p-2 rounded bg-[#CF5824] hover:bg-orange-500 transition-colors"
                              aria-label="Edit Announcement"
                            >
                              <FaEdit className="text-white text-sm md:text-base" />
                            </button>
                            <button
                              onClick={() => handleDeleteAnnouncement(post._id)}
                              className="p-1.5 md:p-2 rounded bg-[#D52121] hover:bg-red-500 transition-colors"
                              aria-label="Delete Announcement"
                            >
                              <BsTrash3 className="text-white text-sm md:text-base" />
                            </button>
                          </div>
                        </div>{" "}
                        <div className="prose prose-sm max-w-none text-gray-600 mt-2 text-xs md:text-sm">
                          {post.description}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
      {editingAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-80 z-50 p-4">
          <div className="relative bg-white w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-lg shadow-lg p-4 md:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeEditModal}
              className="w-6 h-6 md:w-8 md:h-8 absolute top-3 right-3 md:top-4 md:right-4 cursor-pointer"
            />{" "}
            <div className="text-center mb-8">
              <h3 className="text-[40px] font-bold text-[#161F55]">
                Announcement
              </h3>
              <div className="border-b-8 border-[#F3BC62] w-[250px] my-4 mx-auto"></div>
            </div>
            {validationErrors.general && (
              <p className="text-red-500 text-sm mb-4">
                {validationErrors.general}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={editingAnnouncement.title}
                  onChange={(e) =>
                    handleEditModalChange("title", e.target.value)
                  }
                  className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                    validationErrors.title
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
                {validationErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.title}
                  </p>
                )}
              </div>
              <div>
                <ReactQuill
                  theme="snow"
                  value={editingAnnouncement.description}
                  onChange={(content) =>
                    handleEditModalChange("description", content)
                  }
                  modules={quillModules}
                  className={`bg-white [&_.ql-container]:rounded-b-lg [&_.ql-toolbar]:rounded-t-lg ${
                    validationErrors.description
                      ? "[&_.ql-container]:border-red-500 [&_.ql-toolbar]:border-red-500"
                      : "[&_.ql-container]:border-gray-300 [&_.ql-toolbar]:border-gray-300"
                  } [&_.ql-editor]:min-h-[150px] md:[&_.ql-editor]:min-h-[200px] lg:[&_.ql-editor]:min-h-[250px]`}
                />
                {validationErrors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 sm:gap-4 pt-6 md:pt-10">
                <button
                  onClick={closeEditModal}
                  className="w-full sm:w-auto px-4 md:px-6 py-2 bg-[#C9C9C9] text-[#161F55] rounded-xl hover:bg-gray-300 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAnnouncement}
                  className="w-full sm:w-auto px-4 md:px-6 py-2 bg-[#161F55] text-white rounded-xl hover:bg-blue-600 text-sm md:text-base"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50 p-4">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeSuccessModal}
              className="w-8 h-8 md:w-10 md:h-10 absolute -top-4 -right-4 md:-top-6 md:-right-6 cursor-pointer"
            />

            <div className="bg-white p-6 md:p-10 px-8 md:px-20 lg:px-40 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8"
                />
                <p className="text-lg md:text-xl font-semibold text-center">
                  Announcement Posted!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {itemToDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 md:p-8 py-8 md:py-10 rounded-lg shadow-lg text-center max-w-sm md:max-w-md w-full mx-4">
            <p className="mb-6 text-sm md:text-base">
              Are you sure you want to delete this announcement?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10">
              <button
                onClick={cancelDelete}
                className="w-full sm:w-auto px-6 md:px-9 py-2 bg-[#C9C9C9] text-[#161F55] rounded-xl hover:bg-gray-300 text-sm md:text-base"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-6 md:px-9 py-2 bg-[#161F55] text-white rounded-xl hover:bg-blue-600 text-sm md:text-base"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50 p-4">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeDeleteSuccessModal}
              className="w-8 h-8 md:w-10 md:h-10 absolute -top-4 -right-4 md:-top-6 md:-right-6 cursor-pointer"
            />
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8"
                />
                <p className="text-lg md:text-xl font-semibold text-center px-4">
                  Announcement Deleted Successfully!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50 p-4">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeUpdateSuccessModal}
              className="w-8 h-8 md:w-10 md:h-10 absolute -top-4 -right-4 md:-top-6 md:-right-6 cursor-pointer"
            />
            <div className="bg-white p-6 md:p-10 px-8 md:px-20 lg:px-40 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8"
                />
                <p className="text-lg md:text-xl font-semibold text-center">
                  Announcement Updated!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
