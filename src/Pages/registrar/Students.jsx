import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import Sidebar from "/src/components/Sidebar";
import Footer from "/src/pages/registrar/components/Footer.jsx";
import Header from "/src/pages/registrar/components/Header.jsx";

const Students = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      name: "Alice Smith",
      lastSY: "2020-2021",
      program: "Grade 11 - STEM",
      contact: "+1 (123) 456-7890",
      email: "alice.smith@example.com",
      attachment: "ID Card",
      request: "Transcript of Records",
      date: "2025-01-01",
      claiming: "Pick-up",
    },
    {
      name: "Bob Johnson",
      lastSY: "2019-2020",
      program: "Grade 12 - ABM",
      contact: "+1 (234) 567-8901",
      email: "bob.johnson@example.com",
      attachment: "Enrollment Form",
      request: "Certificate of Graduation",
      date: "2025-01-02",
      claiming: "Email",
    },
    {
      name: "Charlie Brown",
      lastSY: "2021-2022",
      program: "Grade 10",
      contact: "+1 (345) 678-9012",
      email: "charlie.brown@example.com",
      attachment: "Payment Receipt",
      request: "Good Moral Certificate",
      date: "2025-01-03",
      claiming: "Courier",
    },
    {
      name: "Daisy Miller",
      lastSY: "2022-2023",
      program: "Grade 11 - HUMSS",
      contact: "+1 (456) 789-0123",
      email: "daisy.miller@example.com",
      attachment: "Report Card",
      request: "Form 137",
      date: "2025-01-04",
      claiming: "Pick-up",
    },
    {
      name: "Evan Davis",
      lastSY: "2018-2019",
      program: "Grade 12 - ICT",
      contact: "+1 (567) 890-1234",
      email: "evan.davis@example.com",
      attachment: "Certificate of Attendance",
      request: "Diploma",
      date: "2025-01-05",
      claiming: "Email",
    },
    {
      name: "Fiona Garcia",
      lastSY: "2017-2018",
      program: "Grade 9",
      contact: "+1 (678) 901-2345",
      email: "fiona.garcia@example.com",
      attachment: "ID Card",
      request: "Transcript of Records",
      date: "2025-01-06",
      claiming: "Courier",
    },
    {
      name: "George Wilson",
      lastSY: "2023-2024",
      program: "Grade 8",
      contact: "+1 (789) 012-3456",
      email: "george.wilson@example.com",
      attachment: "Enrollment Form",
      request: "Certificate of Enrollment",
      date: "2025-01-07",
      claiming: "Pick-up",
    },
    {
      name: "Hannah Lee",
      lastSY: "2016-2017",
      program: "Grade 7",
      contact: "+1 (890) 123-4567",
      email: "hannah.lee@example.com",
      attachment: "Report Card",
      request: "Diploma",
      date: "2025-01-08",
      claiming: "Email",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && (
        <div>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <main
          className="h-[1200px]"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(22, 31, 85, 0.7), rgba(22, 31, 85, 0.7)), url(${"public/assets/image/BackGround.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Students/Alumni's Records"
          />
          <div>
            <section className="h-[1050px] z-10 bg-white max-w-[1300px] mx-auto p-5 my-5">
              {" "}
              <div className="bg-[#D9D9D9] h-44 m-4">
                <div className=" text-[#161F55] px-3 ml-3 pt-2">
                  <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                    LIST OF STUDENTS/ALUMNI'S RECORDS
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[720px] my-3"></div>
                </div>

                <div className="flex justify-between items-center mt-16 ml-4 ">
                  <div className="text-[#161F55] font-semibold text-[18px]">
                    <label htmlFor="show" className="mr-2">
                      SHOW
                    </label>
                    <input
                      type="number"
                      min={"0"}
                      max={"10"}
                      defaultValue={"1"}
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
              <div className="overflow-y-auto m-4 mt-8">
                <table className="text-[18px] w-[2000px] border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="border p-4">NO.</th>
                      <th className="border p-4 w-[200px]">NAME</th>
                      <th className="border p-4  w-[200px]">
                        LAST S.Y.
                        <br />
                        ATTENDED
                      </th>
                      <th className="border p-4  w-[220px]">
                        PROGRAM/
                        <br />
                        GRADE/STRAND
                      </th>
                      <th className="border p-4  w-[220px]">
                        CONTACT
                        <br />
                        NO.
                      </th>
                      <th className="border p-4">EMAIL ADDRESS</th>
                      <th className="border p-4">
                        ATTACHMENT
                        <br />
                        PROOF
                      </th>
                      <th className="border p-4">REQUEST</th>
                      <th className="border p-4">
                        DATE OF
                        <br />
                        REQUEST
                      </th>
                      <th className="border p-4">
                        CLAIMING
                        <br />
                        METHOD
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((data, index) => (
                      <tr key={index} className="even:bg-gray-100 text-[18px]">
                        <td className="border p-5">{index + 1}</td>
                        <td className="border p-5 w-[200px]">{data.name}</td>
                        <td className="border p-5">{data.lastSY}</td>
                        <td className="border p-5">{data.program}</td>
                        <td className="border p-5 w-[200px]">{data.contact}</td>
                        <td className="border p-5">{data.email}</td>
                        <td className="border p-5">{data.attachment}</td>
                        <td className="border p-5 w-[300px]">{data.request}</td>
                        <td className="border p-5">{data.date}</td>
                        <td className="border p-5">{data.claiming}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-10 text-[18px] pl-4">
                <span className="text-[#161F55]">
                  SHOWING 1 TO 10 OF 10 ENTRIES
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
      </div>
    </div>
  );
};

export default Students;
