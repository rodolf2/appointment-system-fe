import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import useSignIn from "./hooks/useSignIn";
import Header from "./Header";

const SignIn = () => {
  const {
    email,
    password,
    remember,
    error,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
  } = useSignIn();

  return (
    <div
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/image/SignIn.png')",
        backgroundSize: "center",
        backgroundPosition: "bottom",
      }}
    >
      {/* Background and Form */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/50 to-[#252F6A]/50"></div>
      {/* Header */}
      <Header />
      <section className="absolute inset-0 flex items-center justify-center mt-10">
        <div className="bg-[#FEFEFE] bg-opacity-30 p-10 rounded-lg shadow-lg max-w-lg h-[640px] w-full">
          <h2 className="text-[30px] font-LatoBold text-[#fefefe] mb-2 tracking-wider mt-[-10px]">
            SIGN IN
          </h2>
          <div className="w-[200px] h-1 bg-[#F3BC62] mb-6"></div>
          <div className="bg-[#FEFEFE] bg-opacity-70 p-10 rounded-lg shadow-lg max-w-md h-[500px] w-full">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#161f55] uppercase mb-2 tracking-wider">
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#161f55] uppercase mb-2 tracking-wider">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={handleRemember}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember user
                  </span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                onClick={handleSignIn}
                className="w-full py-2 px-4 bg-[#161F55] font-LatoRegular text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Log In
              </button>
              <div className="mt-4 text-center text-gray-600">or</div>
              <button
                onClick={handleGmail}
                className="mt-4 w-full py-2 px-4 text-[#161f55] font-LatoRegular border-2 border-[#161f55] rounded-md flex items-center justify-center hover:bg-[#161f55] hover:text-white"
              >
                <FcGoogle className="text-2xl mr-2" />
                Log in using Google
              </button>
            </form>
            <p className="mt-4 text-center text-[16px] font-LatoSemiBold tracking-wide text-[#161f55]">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#F3BC62] hover:text-[#161f55] font-LatoSemiBold"
              >
                Sign Up
              </Link>
            </p>
            {error && (
              <p className="mt-2 text-center text-red-500 font-semibold">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
