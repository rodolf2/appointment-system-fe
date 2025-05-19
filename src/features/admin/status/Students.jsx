import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";
import useStudents from "./hooks/useStudents";
import { FaSearch } from "react-icons/fa";

const Students = () => {
  const { appointments, isSidebarOpen, toggleSidebar } = useStudents();
  return (
    <div className="flex h-screen font-LatoRegular">
      <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="h-[1050px]">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Students/Alumni's Records Request"
          />
          <div>
            <section className="h-[1050px] z-10 bg-white p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-48 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF STUDENTS/ALUMNI&#39;S RECORDS REQUEST
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[900px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-16 ml-4 ">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show" className="mr-2">
                      SHOW
                    </label>
                    <input
                      id="show"
                      name="show"
                      type="number"
                      min={"0"}
                      max={"10"}
                      defaultValue={"1"}
                      className="text-center always-show-spinner"
                    />
                    <span className="ml-2">ENTRIES</span>
                  </div>
                  <div className="relative">
                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="search"
                      type="search"
                      className="border-[#989898] py-2 bg-white text-[#161F55] mr-5 pl-8" // Add padding-left (pl-8) to make space for the icon
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div className="m-4 mt-8">
                <table className="text-[14px] w-full border-collapse border border-[#989898] h-[500px]">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="p-3">TRANSACTION <br />NO.</th>
                      <th className="p-3">NAME</th>
                      <th className="p-3">
                        LAST S.Y.
                        <br />
                        ATTENDED
                      </th>
                      <th className="p-3">
                        PROGRAM/
                        <br />
                        GRADE/STRAND
                      </th>
                      <th className="p-3">
                        CONTACT
                        <br />
                        NO.
                      </th>
                      <th className="p-3">EMAIL ADDRESS</th>
                      <th className="p-3">
                        ATTACHMENT
                        <br />
                        PROOF
                      </th>
                      <th className="p-3">REQUEST</th>
                      <th className="p-3">
                        DATE OF
                        <br />
                        REQUEST
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((data, index) => (
                      <tr key={index} className="even:bg-gray-100 text-[16px]">
                        <td className="border-2 p-3 border-r-[#989898] border-l-[#989898]  text-[#354CCE] font-bold">
                          {data.transactionNumber[0]}
                        </td>
                        <td className="border-2  p-3  border-r-[#989898]">
                          {data.name}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.lastSY}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.program}
                        </td>
                        <td className="border-2  p-3  border-r-[#989898]">
                          {data.contact}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.email}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.attachment}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.request}
                        </td>
                        <td className="border-2  p-3 border-r-[#989898]">
                          {data.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
                <span className="text-[#161F55] uppercase">
                  Showing 1 to 10 of 10 entries
                </span>
                <div>
                  <button className="border p-1 text-[#161F55]">
                    Previous
                  </button>
                  <button className="border bg-[#161F55] text-[#D9D9D9] w-[40px] h-[35px]">
                    1
                  </button>
                  <button className="border p-1 text-[#161F55]">Next</button>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div >
    </div >
  );
};

export default Students;
