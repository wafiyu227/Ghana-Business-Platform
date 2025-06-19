import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import BusinessForm from './src/components/business/BusinessForm'
import  Home  from "./src/pages/Home/Home";
import LoginForm from './src/components/auth/Login'
import SignupForm from './src/components/auth/Signup'
import BusinessDashboard from './src/components/business/BusinessDashboard'


const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register-business" element={<BusinessForm />} />
        <Route path="/dashboard" element={<BusinessDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
