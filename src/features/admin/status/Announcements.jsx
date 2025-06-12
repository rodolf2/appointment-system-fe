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
        } transition-all duration-300 z-20`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1 z-10 min-w-0">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Posting Announcement"
        />

        <main className="flex-1 p-8 space-y-6 overflow-y-auto max-w-[1440px] w-full mx-auto">
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-[24px] font-LatoBold tracking-[2px] text-[#161F55]">
              Add New Announcement
            </h3>
            <div className="border-b-4 border-[#F3BC62] w-[310px] my-2" />
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr,1fr] gap-8">
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={announcement.title}
                  onChange={(e) =>
                    handleAnnouncementChange("title", e.target.value)
                  }
                  className="w-full p-3 border rounded-lg"
                />

                <ReactQuill
                  theme="snow"
                  value={announcement.description}
                  onChange={handleQuillChange}
                  modules={quillModules}
                  placeholder="Description"
                  className="flex-grow flex flex-col"
                  style={{ minHeight: "350px" }}
                />

                <div className="flex justify-end items-center gap-4 pt-10">
                  <button
                    onClick={handleAnnounce}
                    className="bg-[#161F55] text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Announce
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-white flex flex-col">
                <h4 className="font-LatoSemiBold text-[18px] mb-3 text-[#161F55]">
                  Posted Announcements
                </h4>
                <div className="space-y-3 mt-2 flex-1 overflow-y-auto pr-2">
                  {postedAnnouncements.length === 0 ? (
                    <div className="border rounded-lg p-3 text-sm text-gray-600">
                      No office transaction
                    </div>
                  ) : (
                    postedAnnouncements.map((post) => (
                      <div
                        key={post._id}
                        className="border rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h5 className="font-medium flex-1 break-words">
                            {post.title}
                          </h5>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEditAnnouncement(post)}
                              className="p-2 rounded bg-[#CF5824] hover:bg-orange-500 transition-colors"
                              aria-label="Edit Announcement"
                            >
                              <FaEdit className="text-white" />
                            </button>
                            <button
                              onClick={() => handleDeleteAnnouncement(post._id)}
                              className="p-2 rounded bg-[#D52121] hover:bg-red-500 transition-colors"
                              aria-label="Delete Announcement"
                            >
                              <BsTrash3 className="text-white" />
                            </button>
                          </div>
                        </div>

                        <div
                          className="prose prose-sm max-w-none text-gray-600 mt-2"
                          dangerouslySetInnerHTML={{ __html: post.description }}
                        />
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
          <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeEditModal}
              className="w-8 h-8 absolute top-4 right-4 cursor-pointer"
            />
            <h3 className="text-2xl font-bold text-[#161F55] mb-6">
              Edit Announcement
              <div className="border-b-4 border-[#F3BC62] w-[220px] my-2" />
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editingAnnouncement.title}
                onChange={(e) => handleEditModalChange("title", e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <ReactQuill
                theme="snow"
                value={editingAnnouncement.description}
                onChange={(content) =>
                  handleEditModalChange("description", content)
                }
                modules={quillModules}
                className="bg-white"
                style={{ minHeight: "250px" }}
              />
              <div className="flex justify-end items-center gap-4 pt-10">
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2 bg-[#C9C9C9] text-[#161F55] rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAnnouncement}
                  className="px-6 py-2 bg-[#161F55] text-white rounded-xl hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeSuccessModal}
              className="w-10 h-10 absolute -top-6 -right-6 cursor-pointer"
            />

            <div className="bg-white p-10 px-40 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-20 h-20 mb-8"
                />
                <p className="text-xl font-semibold text-center">
                  Announcement Posted!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {itemToDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="bg-white p-8 py-10 rounded-lg shadow-lg text-center max-w-md w-full">
            <p className="mb-6">
              Are you sure you want to delete this announcement?
            </p>
            <div className="flex justify-center gap-10">
              <button
                onClick={cancelDelete}
                className="px-9 py-2 bg-[#C9C9C9] text-[#161F55] rounded-xl hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-9 py-2 bg-[#161F55] text-white rounded-xl hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeDeleteSuccessModal}
              className="w-10 h-10 absolute -top-6 -right-6 cursor-pointer"
            />
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-20 h-20 mb-8"
                />
                <p className="text-xl font-semibold text-center">
                  Announcement Deleted Successfully!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#161F55] bg-opacity-50 z-50">
          <div className="relative">
            <img
              src="/assets/icons/x_icon.svg"
              alt="Close"
              onClick={closeUpdateSuccessModal}
              className="w-10 h-10 absolute -top-6 -right-6 cursor-pointer"
            />
            <div className="bg-white p-10 px-40 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/icons/check_icon.svg"
                  alt="Check icon"
                  className="w-20 h-20 mb-8"
                />
                <p className="text-xl font-semibold text-center">
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
