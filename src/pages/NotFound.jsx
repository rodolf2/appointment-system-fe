import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Log the invalid route access for debugging
  useEffect(() => {
    console.warn(
      `404 Error: User accessed invalid route: ${location.pathname}`
    );

    // Optional: Send to analytics or error tracking service
    // analytics.track('404_error', { path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-indigo-600 mb-4">404</div>
          <div className="w-32 h-32 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17H9m6-2H9m12-2.562A7.962 7.962 0 0112 9c-2.34 0-4.29 1.009-5.824 2.562"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-block">
            <span className="font-mono">{location.pathname}</span>
          </p>
        </div>

        {/* Branding */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <img
              src="/assets/image/LV_logo.png"
              alt="LV Logo"
              className="w-8 h-8"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="font-semibold">LVAppointEase</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            La Verdad Christian School Appointment System
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
