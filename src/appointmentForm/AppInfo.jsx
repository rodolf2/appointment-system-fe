import CustomProgressBar from "/src/features/appointment/CustomProgressBar";
import useAppInfo from "./hooks/useAppInfo";
import PropTypes from "prop-types";

const AppInfo = ({ onNext, onBack, currentStep }) => {
  const { formData, errors, isSubmitting, handleInputChange, handleNext } =
    useAppInfo(onNext);

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

        <div className="flex flex-col justify-center text-center m-2">
          <h2 className="mx-auto relative font-LatoBold text-[35px] text-Fwhite tracking-widest mt-6 mb-4">
            APPLICATION FOR RECORDS
          </h2>
          <div className="mx-auto flex justify-center items-center bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
            <form
              className="space-y-4 w-full"
              onSubmit={handleNext}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            >
              <div className="w-full max-w-[60%] mb-10 mx-auto">
                <CustomProgressBar currentStep={currentStep} />
              </div>

              {/* Show submission error if any */}
              {errors.submit && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{errors.submit}</span>
                </div>
              )}

              <h2 className="uppercase mb-10 flex font-LatoBold text-lg">
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
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className={`pl-2 mt-1 block w-full border-2 h-8 rounded-md ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <div className="text-red-600 text-sm text-start">
                        {errors[field.name]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {[
                {
                  name: "schoolYear",
                  label: "Last School Year Attended",
                  placeholder: "ex. 2016 - 2017",
                  maxLength: 10,
                },
                {
                  name: "course",
                  label: "Course/Program/Grade/Strand",
                  placeholder: "ex. Grade 1",
                  maxLength: 30,
                },
                {
                  name: "address",
                  label: "Present Address",
                  placeholder: "ex. Sampaloc Apalit Pampanga",
                  maxLength: 100,
                },
                {
                  name: "contactNumber",
                  label: "Contact Number",
                  placeholder: "ex. 0981 255 9915",
                  maxLength: 11,
                },
                {
                  name: "email",
                  label: "Email Address",
                  placeholder: "ex. juandelacruz@gmail.com",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-start block text-[17px] font-LatoRegular text-[#000] uppercase">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.name === "email" ? "email" : "text"}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
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

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#1E2772] text-white px-6 py-2 rounded-lg hover:bg-[#161f55] transition-colors mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    onBack();
                    Navigate("/appointmentForm?step=2");
                  }}
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#1E2772] text-white px-6 py-2 rounded-md hover:bg-[#161f55] transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

AppInfo.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default AppInfo;
