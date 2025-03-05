import { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const AppInfo = ({ onNext, onBack }) => {
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
    if (name === "contactNumber" && !/^[0-9]*$/.test(value)) {
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

    // Ensure Contact Number is numeric and 11 digits
    if (formData.contactNumber && !/^\d{11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Contact Number must be 11 digits and contain only numbers.";
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const docRef = await addDoc(collection(db, "information"), {
          ...formData,
        });
        console.log("Document written with ID: ", docRef.id);
        onNext();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <>
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        <div className="absolute inset-0 flex flex-col">
          <div
            className="h-screen bg-cover bg-bottom"
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.3",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className="h-1/2 bg-[#161f55]"></div>
        </div>

        <div className="flex flex-col justify-center text-center m-8">
          <h2 className="mx-auto relative font-LatoBold text-[35px] text-Fwhite tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>
          <div className="mx-auto flex justify-center items-center bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
            <form className="space-y-4" onSubmit={handleNext}>
              <h2 className=" uppercase mb-10 flex font-LatoBold text-lg">
                Personal Details:
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Surname", name: "surname", placeholder: "Cruz" },
                  {
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Juan",
                  },
                  {
                    label: "Middle Name",
                    name: "middleName",
                    placeholder: "Dela",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-start block text-[17px] font-LatoRegular text-[#000] uppercase">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-600 text-sm text-start">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {[
                "schoolYear",
                "course",
                "address",
                "contactNumber",
                "email",
              ].map((name) => (
                <div key={name}>
                  <label className="text-start block text-[17px] font-LatoRegular text-[#000] uppercase">
                    {name.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </label>
                  <input
                    name={name}
                    type={name === "email" ? "email" : "text"}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${name}`}
                    className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                      errors[name] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[name] && (
                    <p className="text-red-600 text-sm text-start">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex float-right space-x-4">
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
