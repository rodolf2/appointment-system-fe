import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AdminNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Log the invalid admin route access
  useEffect(() => {
    console.warn(`Admin 404 Error: User accessed invalid admin route: ${location.pathname}`);
  }, [location.pathname]);

  const handleGoToDashboard = () => {
    navigate("/registrarHome");
  };

  const handleGoToStudents = () => {
    navigate("/students");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-red-600 mb-4">404</div>
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Admin Page Not Found
          </h1>
          <p className="text-gray-600 mb-2">
            The admin page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-block">
            <span className="font-mono">
              {location.pathname}
            </span>
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-3">
          <button
            onClick={handleGoToDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </button>

          <button
            onClick={handleGoToStudents}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View Students
          </button>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Admin Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Quick Admin Links:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => navigate("/appointments")}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate("/schedule")}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Schedule
            </button>
            <button
              onClick={() => navigate("/events")}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Events
            </button>
            <button
              onClick={() => navigate("/feedback")}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
