import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useParams } from "react-router-dom";
// Pages
import BusinessForm from './src/components/business/BusinessForm'
import Home from "./src/pages/Home/Home";
import LoginForm from './src/components/auth/Login'
import SignupForm from './src/components/auth/Signup'
import BusinessDashboard from './src/components/business/BusinessDashboard'
import SignupRequiredPage from './src/components/business/SignupRequired'
import BusinessCard from "./src/components/business/BusinessCard";
import { BusinessProfile } from './src/pages/BusinessProfile'
import FeaturedBusinesses from "./src/pages/Home/FeaturedBusinesses";
import HowItWorksPage from "./src/pages/HowItWorksPage";
import AboutUsPage from "./src/pages/AboutUs";
import Account from "./src/components/business/Account";
import PricingPage from './src/pages/PricingPage'


// Auth
import PrivateRoute from "./src/components/auth/PrivateRoute";

const AppRoutes = () => {
  const { id } = useParams()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup-required" element={<SignupRequiredPage />} />
        <Route path="/business-card" element={<BusinessCard />} />
        <Route path="/business/:business_name" element={<BusinessProfile />} />
        <Route path="/featured-business" element={<FeaturedBusinesses />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/pricing" element={<PricingPage />} />
        


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
