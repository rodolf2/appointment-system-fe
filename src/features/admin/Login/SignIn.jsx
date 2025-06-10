import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import useSignIn from "./hooks/useSignIn";
import Header from "./Header";

const SignIn = () => {
  const {
    email,
    password,
    remember,
    error,
    showPassword,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
    handleTogglePasswordVisibility,
    isLoading,
    isGoogleLoading,
  } = useSignIn();

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/image/SignIn.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(2, 17, 74, 0.5), rgba(3, 21, 125, 0.5), rgba(107, 123, 222, 0.4))`,
        }}
      />
      {/* Logo and Title */}
      <Header />

      <section className="relative flex items-center justify-center pt-20 pb-10 px-4">
        <div className="bg-[#FEFEFE] bg-opacity-30 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-wider">
            SIGN IN
          </h2>
          <div className="w-48 h-1 bg-[#F3BC62] mb-6"></div>

          <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#161f55] uppercase mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#161f55] uppercase mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={handleRemember}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[#161F55] text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Log In"}
              </button>

              <div className="mt-4 text-center text-gray-600">or</div>

              <button
                type="button"
                onClick={handleGmail}
                disabled={isGoogleLoading}
                className="mt-4 w-full py-2 px-4 text-[#161f55] border-2 border-[#161f55] rounded-md flex items-center justify-center hover:bg-[#161f55] hover:text-white disabled:opacity-50"
              >
                <FcGoogle className="text-2xl mr-2" />
                {isGoogleLoading ? "Processing..." : "Log in with Google"}
              </button>
            </form>

            <p className="mt-4 text-center text-[16px] font-semibold text-[#161f55]">
              Don&#39;t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#F3BC62] hover:text-[#161f55]"
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
