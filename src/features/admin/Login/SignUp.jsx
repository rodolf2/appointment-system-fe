import { Link } from "react-router";
import Header from "./Header";
import useSignUp from "./hooks/useSignUp";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const {
    email,
    password,
    confirmPassword,
    error,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleSignUp,
    handleGoogleSignUp,
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/50 to-[#252F6A]/50"></div>

        {/* Logo and Title */}
        <Header />

        {/* Sign Up Form */}
        <section className="absolute inset-0 flex items-center justify-center mt-10">
          <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg h-[640px] max-w-lg w-full">
            <h2 className="text-[30px] font-LatoBold text-[#fefefe] mb-2 tracking-wider mt-[-10px]">
              SIGN UP
            </h2>
            <div className="w-[200px] h-1 bg-[#F3BC62] mb-6"></div>
            <div className="bg-[#FEFEFE] bg-opacity-70 p-10 rounded-lg shadow-lg max-w-md h-[500px] w-full">
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      placeholder="Name"
                      type="text"
                      className="w-full px-4 py-2 border-[#6F6F6F]  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]"
                    />
                  </div>

                  <div>
                    <input
                      placeholder="Email"
                      onChange={handleEmail}
                      type="email"
                      className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]"
                    />
                  </div>
                  <div>
                    <input
                      onChange={handlePassword}
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]"
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      onChange={handleConfirmPassword}
                      className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-50 placeholder-[#000]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-2 text-red-500 text-sm text-center">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full flex justify-center py-2 mt-6 bg-[#161F55] text-[20px] text-[#fefefe] font-LatoRegular rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
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
                  className="mt-4 w-full py-2 px-4 text-[#161f55] font-LatoRegular border-2 border-[#161f55] rounded-md flex items-center justify-center hover:bg-[#161f55] hover:text-white"
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
