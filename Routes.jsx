import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import BusinessForm from './src/components/business/BusinessForm'
import Home from "./src/pages/Home/Home";
import LoginForm from './src/components/auth/Login'
import SignupForm from './src/components/auth/Signup'
import BusinessDashboard from './src/components/business/BusinessDashboard'
import SignupRequiredPage from './src/components/business/SignupRequired'

// Auth
import PrivateRoute from "./src/components/auth/PrivateRoute";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup-required" element={<SignupRequiredPage />} />

        {/* Protected Routes */}
        <Route
          path="/register-business"
          element={
            <PrivateRoute>
              <BusinessForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <BusinessDashboard />
            </PrivateRoute>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
