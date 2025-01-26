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

    // Ensure Contact Number only accepts numeric input
    if (name === "contactNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if fields are empty
    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "This field is required.";
      }
    }

    // Ensure Contact Number is numeric
    if (formData.contactNumber && !/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must contain only numbers.";
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
        // Save data to Firestore
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
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        {/* Background Layers */}
        <div className="absolute inset-0 flex flex-col">
          <div
            className=" h-screen bg-cover bg-bottom "
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.3",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className=" h-1/2 bg-[#161f55]"></div>
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col justify-center text-center m-8">
          <h2 className="mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>
          <div className="mx-auto flex justify-center items-center bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
            <form className="space-y-4" onSubmit={handleNext}>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-start block text-sm font-LatoRegular text-[#000] uppercase">
                    SURNAME
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Cruz"
                    className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                      errors.surname ? "border-red-500" : ""
                    }`}
                  />
                  {errors.surname && (
                    <p className="text-red-600 text-sm mt-0 relative text-start">
                      {errors.surname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-start block text-sm font-LatoRegular text-[#000] uppercase">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Juan"
                    className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-0 relative text-start">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-start block text-sm font-LatoRegular text-[#000] uppercase">
                    MIDDLE NAME
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Dela"
                    className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                      errors.middleName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.middleName && (
                    <p className="text-red-600 text-sm mt-0 relative text-start">
                      {errors.middleName}
                    </p>
                  )}
                </div>
              </div>
              {/* Additional Fields */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                {[
                  {
                    label: "Last School Year Attended",
                    name: "schoolYear",
                    placeholder: "ex. 2016 - 2017",
                  },
                  {
                    label: "Course/Program/Grade/Strand",
                    name: "course",
                    placeholder: "ex. Grade 1",
                  },
                  {
                    label: "Present Address",
                    name: "address",
                    placeholder: "ex. Sampaloc Apalit Pampanga",
                  },
                  {
                    label: "Contact Number",
                    name: "contactNumber",
                    placeholder: "ex. 0981 255 9915",
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    placeholder: "ex. juandelacruz@gmail.com",
                  },
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
                      placeholder={field.placeholder}
                      className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                      onKeyPress={(e) => {
                        if (
                          field.name === "contactNumber" &&
                          !/[0-9]/.test(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors[field.name] && (
                      <p className="text-red-600 text-sm block text-start">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </form>

              {/* Documents Selection */}
              <label className="text-start block text-lg font-LatoRegular text-[#000] mb-4">
                SELECT DOCUMENTS:
              </label>
              <div className="border rounded-lg p-4 shadow-md">
                <div className="cursor-pointer grid grid-cols-2 gap-y-4 gap-x-6 font-LatoRegular text-[#000]">
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
                      label: " (ESC) Certificate",
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
                          className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm "
                        >
                          <span>{doc.toUpperCase()}</span>
                          <button
                            onClick={() => handleRemoveDocument(doc)}
                            className="text-red-600 hover:text-red-800 text-sm font-LatoRegular "
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
                  placeholder="Type Here..."
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
