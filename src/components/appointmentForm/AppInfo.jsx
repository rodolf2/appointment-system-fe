import { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const AppInfo = ({ onNext, onBack }) => {
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    middleName: "",
    schoolYear: "",
    course: "",
    address: "",
    contactNumber: "",
    email: "",
    purpose: "",
    date: "",
  });
  const [errors, setErrors] = useState({}); // Object to track errors for each field

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "This field is required.";
      }
    }
    if (selectedDocuments.length === 0) {
      newErrors.selectedDocuments = "You must select at least one document.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Save data to  Firestore
        const docRef = await addDoc(collection(db, "information"), {
          ...formData,
          selectedDocuments,
          timestamp: new Date(), // Optional: add timestamp
        });
        console.log("Document written with ID: ", docRef.id);
        onNext(); // Proceed to the next step
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleRadioClick = (value) => {
    setSelectedDocuments((prev) =>
      prev.includes(value) ? prev : [...prev, value]
    );

    // Clear error when a document is selected
    setErrors((prev) => ({ ...prev, selectedDocuments: "" }));
  };
  const handleRemoveDocument = (value) => {
    setSelectedDocuments((prev) => prev.filter((doc) => doc !== value));
  };

  return (
    <>
      {/* Form UI remains unchanged */}
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        {/* Background Layers */}
        <div className="absolute inset-0 flex flex-col">
          <div
            className=" h-screen bg-cover bg-bottom "
            style={{
              backgroundImage:
                "url('/public/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.3",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className=" h-1/2 bg-[#161f55]"></div>
        </div>

        {/* INFORMATION */}
        <div className=" flex flex-col justify-center text-center m-8">
          <h2 className=" mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8 ">
            APPLICATION FOR RECORDS
          </h2>
          <div className=" mx-auto flex justify-center items-center bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
            <form className="space-y-4" onSubmit={handleNext}>
              <div className=" grid grid-cols-3 gap-4  ">
                {["surname", "firstName", "middleName"].map((field) => (
                  <div key={field}>
                    <label className="text-start block text-sm font-LatoRegular  text-[#000] uppercase">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <p className=" text-red-600 text-sm mt-0 relative text-start">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {/* Additional Fields */}
              {[
                { label: "Last School Year Attended", name: "schoolYear" },
                { label: "Course/Program/Grade/Strand", name: "course" },
                { label: "Present Address", name: "address" },
                { label: "Contact Number", name: "contactNumber" },
                { label: "Email", name: "email" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-start block text-sm font-LatoRegular text-[#000] uppercase">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.name === "email" ? "email" : "text"}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[field.name] && (
                    <p className=" text-red-600 text-sm block text-start">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
              {/* Documents Selection */}
              <label className="text-start block text-lg font-LatoRegular text-[#000] mb-4">
                SELECT DOCUMENTS:
              </label>
              <div className="border rounded-lg p-4 shadow-md">
                <div className=" cursor-pointer grid grid-cols-2 gap-y-4 gap-x-6 font-LatoRegular text-[#000] ">
                  {[
                    {
                      label: "Certificate of Enrollment",
                      value: "certificate of enrollment",
                    },
                    {
                      label: "Good Moral Certificate",
                      value: "good moral certificate",
                    },
                    { label: "Form 137", value: "form_137" },
                    {
                      label: "Certified True Copy of Documents",
                      value: "certified true copy of Documents",
                    },
                    {
                      label: "Transcript of Records",
                      value: "transcript of records",
                    },
                    {
                      label: "(ESC) Certificate",
                      value: "Education Service Contracting Certificate",
                    },
                  ].map((doc) => (
                    <label
                      key={doc.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name={doc.value}
                        value={doc.value}
                        checked={selectedDocuments.includes(doc.value)}
                        onChange={() => handleRadioClick(doc.value)}
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                      />
                      <span className="text-gray-800">{doc.label}</span>
                    </label>
                  ))}
                </div>
                {/* Error message if no document is selected */}
                {errors.selectedDocuments && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.selectedDocuments}
                  </p>
                )}
                <div className="mt-6">
                  <strong className="text-start block mb-2">
                    Selected Documents:
                  </strong>
                  {selectedDocuments.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedDocuments.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm"
                        >
                          <span>{doc.toUpperCase()}</span>
                          <button
                            onClick={() => handleRemoveDocument(doc)}
                            className="text-red-600 hover:text-red-800 text-sm font-LatoRegular"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-start">No documents selected.</p>
                  )}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="text-start block text-[20px] font-LatoRegular text-[#000]">
                  State Your Purpose for Applying:
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className={`pl-2 pt-1 mt-1 block w-full h-[200px] border-2 rounded-md shadow-sm ${
                    errors.purpose ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
              </div>

              {/* Date */}
              <div>
                <label className="block text-start font-LatoRegular text-[20px] text-[#000]">
                  Date of Request
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-[200px] h-[30px] pl-2 border-gray-300 border-2 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-[#161f55] rounded hover:bg-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    onBack();
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#161f55] text-white rounded-md shadow hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppInfo;
