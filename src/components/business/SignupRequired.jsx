import React from "react";
import { Building, UserPlus, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignupRequiredPage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Redirect to your signup page
    navigate("/signup");
    console.log("Redirecting to signup page...");
  };

  const handleLogin = () => {
    // Redirect to your login page
    navigate("/login");
    console.log("Redirecting to login page...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
          <Building className="w-10 h-10 text-white" />
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Account Required
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          You need to sign up for an account before you can register your
          business with us.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create New Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Already have an account? Sign In
          </button>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 text-left">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">
              Why do I need an account?
            </h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Secure access to your business information</li>
            <li>• Manage and update your business details anytime</li>
            <li>• Track your registration status</li>
            <li>• Access exclusive business resources</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default SignupRequiredPage;
