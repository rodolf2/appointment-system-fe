import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const Faqs = () => {
  const [dropdowns, setDropdowns] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState([]); // Array to track open dropdowns

  // Fetch dropdown data from Firestore
  useEffect(() => {
    const fetchDropdowns = async () => {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      const dropdownData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDropdowns(dropdownData);
    };

    fetchDropdowns();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    ); // Add/remove ID from the list of open dropdowns
  };

  return (
    <>
      <section className=" bg-[#161F55] w-full flex justify-center flex-col text-center relative  ">
        <h2 className=" text-Fwhite font-LatoBold text-[60px] mb-8 mt-24 tracking-widest ">
          FAQs
        </h2>
        <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>
        <p className=" mx-auto font-LatoRegular text-Bbackground text-[30px] tracking-wider w-[900px] mb-20">
          Find answers to common questions here. For anything else, feel free to
          contact us!
        </p>

        {/* QUESTIONS AND ANSWERS */}
        <div className="w-full max-w-md mx-auto mt-2 mb-32 flex flex-col items-center">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.id} className="mb-8">
              {/* Dropdown Header */}
              <div
                onClick={() => toggleDropdown(dropdown.id)}
                className={`flex justify-between items-center text-3xl w-[900px] text-Fwhite p-4 border-[3px] cursor-pointer ${
                  openDropdowns.includes(dropdown.id)
                    ? "bg-[#d9d9d9] text-[#161f55] font-LatoBold"
                    : "hover:bg-Fwhite hover:text-black hover:font-LatoBold "
                }`}
              >
                <span className="flex text-start">{dropdown.Title}</span>
                <span className="text-[35px] ">
                  {openDropdowns.includes(dropdown.id) ? "−" : "+"}
                </span>
              </div>

              {/* Dropdown Content */}
              {openDropdowns.includes(dropdown.id) && (
                <div className="text-Fwhite p-4 border-2 cursor-pointer h-[10rem] flex justify-center items-center">
                  <p className="text-[24px] text-start">{dropdown.Content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Faqs;
