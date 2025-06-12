import { Link } from "react-router";
import Header from "./Header";
import useSignUp from "./hooks/useSignUp";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    handleName,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleSignUp,
    handleGoogleSignUp,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    errors,
    isSubmitting,
    apiError,
  } = useSignUp();

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/assets/image/SignIn.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(2, 17, 74, 0.5), rgba(3, 21, 125, 0.5), rgba(107, 123, 222, 0.4))`,
          }}
        />

        {/* Logo and Title */}
        <Header />

        {/* Sign Up Form */}
        <section className="absolute inset-0 flex items-center justify-center mt-10">
          <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg h-[670px] max-w-lg w-full">
            <h2 className="text-[30px] font-LatoBold text-[#fefefe] mb-2 tracking-wider mt-[-10px]">
              SIGN UP
            </h2>
            <div className="w-[200px] h-1 bg-[#F3BC62] mb-6"></div>
            <div className="bg-[#FEFEFE] bg-opacity-70 p-10 rounded-lg shadow-lg max-w-md h-[530px] w-full">
              {/* Display API-level errors */}
              {apiError && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-medium">{apiError}</p>
                </div>
              )}

              <form onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={handleName}
                      className={`w-full px-4 py-2 border ${
                        errors.name ? "border-red-500" : "border-[#6F6F6F]"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                      type="email"
                      className={`w-full px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-[#6F6F6F]"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      value={password}
                      onChange={handlePassword}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`w-full px-4 py-2 border ${
                        errors.password ? "border-red-500" : "border-[#6F6F6F]"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]`}
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="text-gray-500" />
                      ) : (
                        <AiOutlineEye className="text-gray-500" />
                      )}
                    </span>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
                      className={`w-full px-4 py-2 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[#6F6F6F]"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]`}
                      required
                    />
                    <span
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className="text-gray-500" />
                      ) : (
                        <AiOutlineEye className="text-gray-500" />
                      )}
                    </span>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 mt-6 bg-[#161F55] text-[20px] text-[#fefefe] font-LatoRegular rounded-md hover:bg-blue-700 focus:outline-none ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-[16px] mt-4 text-[#161f55] font-LatoRegular tracking-wider">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-LatoSemiBold text-[#F3BC62] hover:text-[#161f55]"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-600">or</p>
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isSubmitting}
                  className={`mt-4 w-full py-2 px-4 text-[#161f55] font-LatoRegular border-2 border-[#161f55] rounded-md flex items-center justify-center hover:bg-[#161f55] hover:text-white ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <FcGoogle className="text-2xl mr-2" />
                  Sign Up with Google
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;